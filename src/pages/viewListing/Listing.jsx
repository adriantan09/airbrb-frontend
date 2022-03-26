
import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'

import api from '../../api/api';
import Booking from './components/Booking';
import ListingSummary from './components/ListingSummary'
import DisplayRating from '../../components/DisplayRating';

import {
  Divider,
  Button,
} from '@mui/material'

import ImagePreview from './components/ImagePreview'
import Review from './components/Review'
import BookingStatus from './components/BookingStatus'
import ReviewCard from './components/ReviewCard'

const Listing = ({ auth, setPrompt, isDateSearch }) => {
  let { id: listingId } = useParams();
  listingId = parseInt(listingId, 10)

  const [listing, setListing] = useState({})
  const [bookings, setBookings] = useState([])
  const [reviewModal, setReviewModal] = useState(false)
  const [bookingMade, setBookingMade] = useState(false)
  const [reviewMade, setReviewMade] = useState(false)
  const [starType, setStarType] = useState(0)
  const [starReviewModal, setStarReviewModal] = useState(false)

  // Remove once search is implemented
  isDateSearch = false;
  // const desktopScreen = useMediaQuery('(min-width: 900px)');

  const {
    reviews = [],
    thumbnail = '',
    metadata: { amenities, photos } = [],
  } = listing

  useEffect(async () => {
    fetchListing()
    if (auth) { fetchBookings() }
    setBookingMade(false)
    setReviewMade(false)
  }, [bookingMade, reviewMade])

  useEffect(() => {
    if (starType !== 0) setStarReviewModal(true)
  }, [starType])

  const fetchListing = async () => {
    const res = await api.listings.data(listingId)
    if (Object.keys(res.data.data.listing).length === 0) {
      alert('INVALID ListingId')
    } else {
      res.data.data.listing.id = listingId
      setListing(res.data.data.listing)
    }
  }

  const fetchBookings = async () => {
    const res = await api.bookings.all()
    const bookings = filterBookings(res.data.data.bookings)
    console.log('BOOKINGS', res)
    setBookings(bookings)
  }

  const filterBookings = (allBookings) => {
    const userBookings = allBookings.filter(
      booking => booking.owner === localStorage.getItem('email')
    )
    const listingBookings = userBookings.filter(
      booking => listingId === parseInt(booking.listingId, 10)
    )

    listingBookings.forEach(booking => {
      switch (booking.status) {
        case 'accepted':
          booking.severity = 'success'
          booking.message = 'Accepted'
          break;
        case 'pending':
          booking.severity = 'info'
          booking.message = 'Pending'
          break;
        case 'declined':
          booking.severity = 'error'
          booking.message = 'Declined'
          break;
      }
    })

    return listingBookings
  }

  const findAcceptedBooking = (bookings) => {
    return bookings.find(b => b.status === 'accepted')
  }

  const filterStarReviews = (reviews, starType) => {
    return reviews.filter(review => review.score === starType)
  }

  return (
    <PageContainer>
      <MainContainer>
        <PropertyContainer>
          <Wrapper>
            <Thumbnail src={thumbnail.base64} alt="Listing Image" />
            { (photos) && <ImagePreview pictures={photos}/> }
          </Wrapper>
          <ListingSummary
            setStarType={setStarType}
            listing={listing}
            isDateSearch={isDateSearch}
          />
        </PropertyContainer>
      </MainContainer>

      <StyledDivider />
        <BookingContainer>
          <SubTitle>Make a booking</SubTitle>
          { (listing) &&
            <Booking
              auth={auth}
              listing={listing}
              setPrompt={setPrompt}
              setBookingMade={setBookingMade}
            />
          }
        </BookingContainer>
      <StyledDivider />

      <SubTitle>Amenities</SubTitle>
      { (amenities) &&
        <AmenitiesContainer>
          { (amenities.length === 0)
            ? <SubHeader>This property has no amenities</SubHeader>
            : <>
                { amenities.map((item, idx) => {
                  return (<SubHeader key={idx}>• {item}</SubHeader>)
                })}
              </>
          }
        </AmenitiesContainer>
      }

      <StyledDivider />

      <SubTitle>Reviews</SubTitle> {/* Reviews Section */}
      { (!findAcceptedBooking(bookings)) &&
          <Disclaimer>
            (A review can be made once your booking is accepted.)
          </Disclaimer>
      }
      { (reviews.length === 0)
        ? <SubHeader>No reviews</SubHeader>
        : <Container>
          { reviews.map((review, idx) => {
            return (<ReviewCard key={idx} review={review}/>)
          })}
        </Container>
      }

      { (findAcceptedBooking(bookings)) &&
        <Button variant="outlined" onClick={() => setReviewModal(true)}>
          Leave a review
        </Button>
      }
      { (reviewModal) &&
        <Review
          open={reviewModal}
          setOpen={setReviewModal}
          listing={listing}
          booking={findAcceptedBooking(bookings)}
          setReviewMade={setReviewMade}
        />
      }

      { (bookings.length !== 0) &&
        <>
        <StyledDivider />
        <SubTitle>Current Bookings</SubTitle>
        <Container>
          { bookings.map((booking, idx) => {
            return (
              <BookingStatus key={idx} booking={booking}/>
            )
          })}
        </Container>
        </>
      }
      { (starReviewModal) &&
        <DisplayRating
          open={starReviewModal}
          setOpen={setStarReviewModal}
          reviews={filterStarReviews(reviews, starType)}
        />
      }
    </PageContainer>
  )
}

export default Listing

Listing.propTypes = {
  listing: PropTypes.object,
  auth: PropTypes.bool,
  setPrompt: PropTypes.func,
  isDateSearch: PropTypes.bool,
}

const PageContainer = styled.div`
  width: 90vw;
  max-width: 850px;
  margin: 7vh auto;
  padding-bottom: 20px;
`

const MainContainer = styled.div` 
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    justify-content: space-between;
  }
`

const PropertyContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  gap: 30px;

  @media (max-width: 800px) {
    flex-direction: column;
    width: 500px;
    gap: 0;
  }
  /* @media (min-width: 900px) {
    max-width: 370px;
  } */
`

const AmenitiesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  max-width: 550px;
`

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 7px;
`

const SubHeader = styled.h3`
  font-weight: 400;
  font-size: 13pt;
`

const SubTitle = styled(SubHeader)`
  font-weight: 500;
`

const StyledDivider = styled(Divider)`
  && {
    margin: 20px 0;
  }
`

const Container = styled.div`
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  padding: 10px;
  max-height: 400px;
  overflow-y: scroll;
  margin-bottom: 20px;
`

const BookingContainer = styled.div`
  h3 {
    text-align: center;
    font-size: 16pt;
    margin-top: 0;
  }
  margin: 0 auto;
  width: 400px;
`

const Disclaimer = styled.p`
  font-size: 10pt;
`

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 400px;
  margin: 0 auto;
`
