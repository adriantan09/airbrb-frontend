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
  IconButton,
} from '@mui/material'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const AvailabilityTable = ({ availabilities, setAvailabilities }) => {
  const handleDelete = (index) => {
    availabilities.splice(index, 1)
    setAvailabilities([...availabilities])
  }

  return (
    <Container component={Paper} elevation={2}>
      <Table aria-label="availability table">
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { availabilities.map((dateObj, idx) => (
            <TableRow key={idx}>
              <TableCell>
                { moment(dateObj.startDate).format('dddd D MMM') }
              </TableCell>
              <TableCell>
                { moment(dateObj.endDate).format('dddd D MMM') }
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(idx)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      { (availabilities.length === 0) &&
        <NoItems>
          Add avalitability for your listing by<br />
          selecting dates in the calendar
        </NoItems>
      }
  </Container>
  )
}

AvailabilityTable.propTypes = {
  availabilities: PropTypes.array,
  setAvailabilities: PropTypes.func,
}

export default AvailabilityTable

const Container = styled(TableContainer)`
  && {
    max-width: 500px;
    margin: 0 auto;
    height: 300px;
    overflow-y: scroll;
  }
`

const NoItems = styled.p`
  position: relative;
  text-align: center;
  margin-top: 60px;
  line-height: 2em;
`
