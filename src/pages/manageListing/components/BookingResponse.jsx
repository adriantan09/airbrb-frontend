import { React, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import api from '../../../api/api'

import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

const BookingResponse = ({ open, setOpen, setResponse, type, booking, listing }) => {
  const color = (type === 'Accept') ? 'info' : 'error'
  const handleClose = () => setOpen(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!isValidBooking(listing, booking)) {
      if (!listing.published) {
        setErrorMsg('Listing is not published.')
      } else {
        setErrorMsg('Listing not available for booking dates.')
      }
    }
  }, [])

  const handleResponse = async (listing, booking, type) => {
    if (type === 'Accept' && errorMsg === '') {
      const res = await api.bookings.accept(booking.id)
      if (res.error) {
        console.error(res.error.data.error)
      } else {
        setResponse(true)
      }
    } else {
      const res = await api.bookings.decline(booking.id)
      if (res.error) {
        console.error(res.error.data.error)
      } else {
        setResponse(true)
      }
    }
    handleClose()
  }

  const isValidBooking = (listing, booking) => {
    const bookingStart = moment(booking.dateRange.startDate);
    const bookingEnd = moment(booking.dateRange.endDate);

    let validBooking = false
    listing.availability.forEach(dateRange => {
      const startValid = bookingStart.isBetween(dateRange.startDate, dateRange.endDate, 'days', '[]')
      const endValid = bookingEnd.isBetween(dateRange.startDate, dateRange.endDate, 'days', '[]')

      if (startValid && endValid) { validBooking = true }
    })
    return validBooking
  }

  return (
    <StyledDialog fullWidth open={open} onClose={handleClose}>
      { (type === 'Accept')
        ? <DialogTitle>{'Accept Booking?'}</DialogTitle>
        : <DialogTitle>{'Reject Booking?'}</DialogTitle>
      }

      <DialogContent>
        <Section>
          <SubHeader>User:</SubHeader>
          <SubTitle>{booking.owner}</SubTitle>
        </Section>
        <Section>
          <SubHeader>Dates:</SubHeader>
          <SubTitle>
            {moment(booking.dateRange.startDate).format('ddd D MMM')}
            {''} to {''}
            {moment(booking.dateRange.endDate).format('ddd D MMM')}
          </SubTitle>
        </Section>
        <Section>
          <SubHeader>Total Price:</SubHeader>
          <SubTitle>
            ${booking.totalPrice}
          </SubTitle>
        </Section>
        { (errorMsg !== '') &&
          <StyledAlert severity="error">{errorMsg}</StyledAlert>
        }

      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        { (errorMsg !== '' && type === 'Accept')
          ? <Button
              variant="contained"
              disabled={true}
              color={color}
              onClick={async () => { await handleResponse(listing, booking, type) }}
            >{type}</Button>
          : <Button
              variant="contained"
              color={color}
              onClick={async () => { await handleResponse(listing, booking, type) }}
            >{type}</Button>
        }
      </DialogActions>
    </StyledDialog>
  )
}

export default BookingResponse

BookingResponse.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setResponse: PropTypes.func,
  type: PropTypes.string,
  booking: PropTypes.object,
  listing: PropTypes.object,
}

const StyledDialog = styled(Dialog)`
  && {
    margin: 0 auto;
    max-width: 500px;
  }
`

const StyledAlert = styled(Alert)`
  && {
    width: 90%;
  }
`

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
`

const SubHeader = styled.p`
  font-weight: 500;
  font-size: 13pt;
  margin: 0;
  margin-right: 10px;
`

const SubTitle = styled.p`
  font-weight: 300;
  font-size: 13pt;
  text-align: right;
  margin: 0;
`
