import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import api from '../../../api/api'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

const ConfirmBooking = ({ open, setOpen, dates, listing, setErrorMsg, setSuccessMsg, setBookingMade }) => {
  const handleClose = () => setOpen(false)
  const startDate = new Date(dates[0])
  const endDate = new Date(dates[1])

  const handleBooking = async () => {
    const dateRange = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    }
    const res = await api.bookings.create(listing.id, dateRange, totalPrice(listing.price))
    if (res.error) {
      setErrorMsg(res.error.data.error)
    } else {
      setSuccessMsg(`Your booking with id: ${res.data.data.bookingId} has been made!`)
      setBookingMade(true)
    }
    handleClose()
  }

  const totalPrice = (price) => {
    return Math.round((nights() * price) * 100) / 100
  }

  const nights = () => {
    return Math.round(Math.abs(((startDate - endDate) / (24 * 60 * 60 * 1000))))
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Confirm Booking'}</DialogTitle>
      <DialogContent>
        <Section>
          <SubHeader>Dates:</SubHeader>
          <SubTitle>
            {moment(startDate).format('ddd D MMM')} to {moment(endDate).format('ddd D MMM')}
          </SubTitle>
        </Section>
        <Section>
          <SubHeader>Total Price:</SubHeader>
          <SubTitle>
          ${listing.price} x {nights()} nights = ${totalPrice(listing.price)}
          </SubTitle>
        </Section>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={async () => await handleBooking()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmBooking

ConfirmBooking.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  dates: PropTypes.array,
  listing: PropTypes.object,
  setErrorMsg: PropTypes.func,
  setSuccessMsg: PropTypes.func,
  setBookingMade: PropTypes.func,
}

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
