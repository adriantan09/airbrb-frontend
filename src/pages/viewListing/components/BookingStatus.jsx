import { React } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Alert } from '@mui/material'

const BookingStatus = ({ booking }) => {
  return (
    <Booking severity={booking.severity}>
      <Section>
        <StatusHeader id="booking-header">Booking ID:</StatusHeader>
        <StatusMsg id="booking-id">{booking.id}</StatusMsg>
      </Section>
      <Section>
        <StatusHeader>Dates:</StatusHeader>
        <StatusMsg id="booking-dates">
          {moment(booking.dateRange.startDate).format('ddd D MMM')}
          {''} - {''}
          {moment(booking.dateRange.endDate).format('ddd D MMM')}
        </StatusMsg>
      </Section>
      <Section>
        <StatusHeader>Status:</StatusHeader>
        <StatusMsg id="booking-msg">{booking.message}</StatusMsg>
      </Section>
    </Booking>
  )
}

BookingStatus.propTypes = {
  booking: PropTypes.object,
}

export default BookingStatus

const Section = styled.div`
  display: flex;
  height: 25px;
  width: 100%;
  align-items: center;
`

const StatusHeader = styled.p`
  font-weight: 500;
  font-size: 12pt;
  margin: 0;
  margin-right: 20px;
  width: 28%;
  min-width: 84px;
`

const StatusMsg = styled.p`
  font-weight: 500;
  font-size: 11pt;
  margin: 0;
  margin-top: 1px;
`

const Booking = styled(Alert)`
  && {
    justify-content: space-between;
    margin: 10px auto;

    @media (max-width: 500px) {
      .MuiAlert-icon { display: none; }
    }
  }

  .MuiAlert-message {
    width: 100%;
  }
`
