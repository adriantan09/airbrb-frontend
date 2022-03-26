
import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import moment from 'moment'

import api from '../../api/api'
import ListingSummary from '../viewListing/components/ListingSummary'
import BookingsTable from './components/BookingsTable'

import {
  Paper,
  List,
  ListItem,
} from '@mui/material'
import BookingResponse from './components/BookingResponse'

const ListingBookings = () => {
  let { id: listingId } = useParams()
  listingId = parseInt(listingId, 10)

  const [listing, setListing] = useState({})
  const [pendingBookings, setPendingBookings] = useState([])
  const [resolvedBookings, setResolvedBookings] = useState([])
  const [yearlyBookings, setYearlyBookings] = useState([])

  const [booking, setBooking] = useState({})
  const [confirmAccept, setConfirmAccept] = useState(false)
  const [acceptedBooking, setAcceptedBooking] = useState(false)
  const [confirmReject, setConfirmReject] = useState(false)
  const [rejectedBooking, setRejectedBooking] = useState(false)

  useEffect(async () => {
    fetchListingData(listingId)

    const listingBookings = await fetchListingBookings()
    fetchPendingBookings(listingBookings)
    fetchResolvedBookings(listingBookings)
    fetchYearlyBookings(listingBookings)

    setRejectedBooking(false)
    setAcceptedBooking(false)
  }, [acceptedBooking, rejectedBooking])

  const fetchListingData = async (listingId) => {
    const res = await api.listings.data(listingId)
    setListing(res.data.data.listing)
  }

  const fetchListingBookings = async () => {
    const res = await api.bookings.all()
    return res.data.data.bookings.filter(
      booking => listingId === parseInt(booking.listingId, 10)
    )
  }

  const fetchPendingBookings = (listingBookings) => {
    const pendingBookings = listingBookings.filter(
      booking => booking.status === 'pending'
    )
    setPendingBookings(pendingBookings)
  }

  const fetchResolvedBookings = (listingBookings) => {
    const resolvedBookings = listingBookings.filter(
      booking => booking.status !== 'pending'
    )
    setResolvedBookings(resolvedBookings)
  }

  const fetchYearlyBookings = (listingBookings) => {
    const acceptedBookings = listingBookings.filter(
      booking => booking.status === 'accepted'
    )

    const year = moment().year()
    const jan = moment(`1/1/${year}`)
    const dec = moment(`12/31/${year}`)

    const yearlyBookings = []
    acceptedBookings.forEach(booking => {
      const startDate = moment(booking.dateRange.startDate)
      const endDate = moment(booking.dateRange.endDate)
      if (startDate.isBetween(jan, dec, 'days', '[]') ||
          endDate.isBetween(jan, dec, 'days', '[]')) {
        yearlyBookings.push(booking)
      } else if (startDate.isBefore(jan) && endDate.isAfter(dec)) {
        yearlyBookings.push(booking)
      }
    })
    setYearlyBookings(yearlyBookings)
  }

  const calcDaysOnline = (postedOn) => {
    const postDate = moment(postedOn)
    const currDate = moment()
    const days = currDate.diff(postDate, 'days') + 1
    return days === 1 ? `${days} day` : `${days} days`
  }

  const calcBookedNights = (yearlyBookings) => {
    const year = moment().year()
    const jan = moment(`1/1/${year}`)
    const dec = moment(`12/31/${year}`)

    let nights = 0
    yearlyBookings.forEach(booking => {
      const startDate = moment(booking.dateRange.startDate)
      const endDate = moment(booking.dateRange.endDate)
      if (startDate.isBefore(jan) && endDate.isAfter(dec)) {
        // Case 1: A booking starts before and finishes after
        // the current year
        nights += dec.diff(jan, 'days')
      } else if (startDate.isBefore(jan) && endDate.isBefore(dec)) {
        // Case 2: A booking starts before but finishes during
        // the current year
        nights += endDate.diff(jan, 'days')
      } else if (startDate.isAfter(jan) && endDate.isAfter(dec)) {
        // Case 3: A booking starts during but finishes after
        // the current year
        nights += dec.diff(startDate, 'days') + 2
      } else {
        // Case 4: A booking starts and finishes during
        // the current year)
        nights += endDate.diff(startDate, 'days')
      }
    })
    return nights
  }

  const calcProfit = (yearlyBookings, pricePerNight) => {
    if (yearlyBookings.length === 0) return 0
    return calcBookedNights(yearlyBookings) * pricePerNight
  }

  return (
    <PageContainer>
      <MainContainer>
        <ListingSummary listing={listing}/>
        <PropertyCard elevation={3}>
          <List dense={false}>
            <StyledListItem>
              { (listing.postedOn === null)
                ? <SubHeader>
                    This listing has not been posted.
                  </SubHeader>
                : <SubHeader>
                    This listing has been online for <b>{calcDaysOnline(listing.postedOn)}</b>
                  </SubHeader>
              }
            </StyledListItem>
            <StyledListItem>
              <SubHeader>
                This listing has been booked for <b>{calcBookedNights(yearlyBookings)} nights</b> this year
              </SubHeader>
            </StyledListItem>
            <StyledListItem>
              <SubHeader>
                This listing has earned <b>${calcProfit(yearlyBookings, listing.price)}</b> this year
              </SubHeader>
            </StyledListItem>
          </List>
        </PropertyCard>
      </MainContainer>

      <Header>Pending Booking Requests</Header>
      <BookingsTable
        bookings={pendingBookings}
        setConfirmAccept={setConfirmAccept}
        setConfirmReject={setConfirmReject}
        setBooking={setBooking}
      />

      { (confirmAccept) &&
        <BookingResponse
          open={confirmAccept}
          setOpen={setConfirmAccept}
          setResponse={setAcceptedBooking}
          type={'Accept'}
          booking={booking}
          listing={listing}
        />
      }
      { (confirmReject) &&
        <BookingResponse
          open={confirmReject}
          setOpen={setConfirmReject}
          setResponse={setRejectedBooking}
          type={'Reject'}
          booking={booking}
          listing={listing}
        />
      }

      <Header>Resolved Booking Requests</Header>
      <BookingsTable bookings={resolvedBookings}/>
    </PageContainer>
  )
}

export default ListingBookings

const PageContainer = styled.div`
  width: 90vw;
  max-width: 1000px;
  margin: 7vh auto;
`

const MainContainer = styled.div`
  @media (min-width: 850px) {
    display: flex;
    
  }
`

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 20pt;
`

const SubHeader = styled(Header)`
  text-align: left;
  font-weight: 500;
  font-size: 12pt;
`

const PropertyCard = styled(Paper)`
  && {
    padding: 20px;
    max-width: 400px;
    margin: 30px auto;
  }
`

const StyledListItem = styled(ListItem)`
  height: 50px;
`
