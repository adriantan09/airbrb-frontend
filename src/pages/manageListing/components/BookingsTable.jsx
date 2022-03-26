import { React } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  useMediaQuery
} from '@mui/material'

const BookingsTable = ({ bookings, setConfirmAccept, setConfirmReject, setBooking }) => {
  const medBreakpoint = useMediaQuery('(min-width:600px)')
  const lrgBreakpoint = useMediaQuery('(min-width:850px)')

  const handleReject = (booking) => {
    setConfirmReject(true)
    setBooking(booking)
  }

  const handleAccept = (booking) => {
    setConfirmAccept(true)
    setBooking(booking)
  }

  return (
    <Container component={Paper} elevation={2}>
      <Table aria-label="availability table">
        <TableHead>
          <TableRow>
            {(medBreakpoint) && <TableCell>User</TableCell>}
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            {(lrgBreakpoint) && <TableCell>Total Price ($)</TableCell>}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { bookings.map((booking, idx) => (
            <TableRow key={idx}>
              {(medBreakpoint) && <TableCell>{booking.owner}</TableCell>}
              <TableCell>
                { moment(booking.dateRange.startDate).format('ddd D MMM y') }
              </TableCell>
              <TableCell>
                { moment(booking.dateRange.endDate).format('ddd D MMM y') }
              </TableCell>
              {(lrgBreakpoint) && <TableCell>${booking.totalPrice}</TableCell>}
              <TableCell align="center">
                { (booking.status === 'pending')
                  ? <>
                      <StyledButton
                        variant="contained"
                        color="info"
                        onClick={() => handleAccept(booking)}>
                        Accept
                      </StyledButton>
                      <StyledButton
                        variant="outlined"
                        color="error"
                        onClick={() => handleReject(booking)}
                      >
                        Reject
                      </StyledButton>
                    </>
                  : <>{booking.status}</>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      { (bookings.length === 0) &&
        <NoItems>
          No bookings to show
        </NoItems>
      }
  </Container>
  )
}

BookingsTable.propTypes = {
  bookings: PropTypes.array,
  setConfirmAccept: PropTypes.func,
  setConfirmReject: PropTypes.func,
  setBooking: PropTypes.func,
}

export default BookingsTable

const Container = styled(TableContainer)`
  && {
    margin: 0 auto;
    height: 360px;
    overflow-y: scroll;
    max-width: 900px;
  }
`

const NoItems = styled.p`
  position: relative;
  text-align: center;
  margin-top: 60px;
  line-height: 2em;
`

const StyledButton = styled(Button)`
  && {
    margin: 3px 0;
  }
`
