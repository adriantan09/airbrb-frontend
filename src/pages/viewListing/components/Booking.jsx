import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Alert,
  Button,
  useMediaQuery
} from '@mui/material'

import TextField from '@mui/material/TextField';

import { useHistory } from 'react-router'
import ConfirmBooking from './ConfirmBooking'

const Booking = ({ auth, listing, setPrompt, setBookingMade }) => {
  const history = useHistory()

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [confirmBooking, setConfirmBooking] = useState(false);

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const desktopScreen = useMediaQuery('(min-width: 900px)');
  if (desktopScreen - 50) { window.scrollTo(0, 0) }

  const handleOpen = () => {
    if (!auth) {
      setPrompt(true)
      history.push('/signin')
    }
    setConfirmBooking(true)
  }

  useEffect(() => { // Live booking validation
    if (startDate === null || endDate === null) {
      setErrorMsg('')
    } else {
      const start = new Date(startDate)
      const end = new Date(endDate)
      if (start === end) {
        setErrorMsg('Stay must be across two separate dates')
      }
    }

    if (errorMsg) {
      setSuccessMsg('')
    }
  }, [errorMsg, startDate, endDate])

  return (
    <BookingContainer>
      <DateWrapper>
        <TextField
          name='Start Date'
          label='Start Date'
          InputLabelProps={{ shrink: true, required: true }}
          type='date'
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          name='End Date'
          label='End Date'
          InputLabelProps={{ shrink: true, required: true }}
          type='date'
          onChange={(e) => setEndDate(e.target.value)}
        />
      </DateWrapper>

      {errorMsg !== '' ? <Alert severity="error">{errorMsg}</Alert> : ''}
      {successMsg !== '' ? <Alert severity="success">{successMsg}</Alert> : ''}
      <StyledButton
        variant="contained"
        disabled={!(startDate && endDate && errorMsg === '')}
        onClick={() => handleOpen()}
      >
        Request Booking
      </StyledButton>
      { (confirmBooking) &&
        <ConfirmBooking
          open={confirmBooking}
          setOpen={setConfirmBooking}
          dates={[startDate, endDate]}
          listing={listing}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
          setBookingMade={setBookingMade}
        />
      }
    </BookingContainer>
  )
}

Booking.propTypes = {
  listing: PropTypes.object,
  auth: PropTypes.bool,
  setPrompt: PropTypes.func,
  setBookingMade: PropTypes.func,
}

export default Booking

const BookingContainer = styled.div`
  width: 100%;
  /* max-width: 450px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* padding-top: 315px; */
`

const StyledButton = styled(Button)`
  && {
    margin-top: 10px;
  }
`

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
`
