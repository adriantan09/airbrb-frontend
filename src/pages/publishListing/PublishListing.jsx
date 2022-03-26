import { React, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import styled from 'styled-components'
import moment from 'moment'
import ListingSummary from '../viewListing/components/ListingSummary'
import AvailabilityTable from './components/AvailabilityTable'
import TextField from '@mui/material/TextField';

import {
  Alert,
  Button,
} from '@mui/material'

import api from '../../api/api'

const PublishListing = () => {
  let { id: listingId } = useParams()
  listingId = parseInt(listingId, 10)
  const history = useHistory()

  const [listing, setListing] = useState({})
  const [availabilities, setAvailabilities] = useState([])

  const [errorMsg, setErrorMsg] = useState('')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(async () => {
    const res = await api.listings.data(listingId)
    setListing(res.data.data.listing)
  }, [])

  useEffect(() => { // Live booking validation
    if (startDate !== null && endDate !== null) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      if (startDate === endDate) {
        setErrorMsg('Stay must be across two separate dates')
      } else if (start > end) {
        setErrorMsg('End Date must be after than Start Date')
      } else if (isOverlap(availabilities)) {
        setErrorMsg('There are dates that overlap')
      } else {
        setErrorMsg('')
      }
    }
  }, [availabilities, startDate, endDate])

  const isOverlap = (availabilities) => {
    if (availabilities.length <= 1) return false
    availabilities.sort((a1, a2) => a1.startDate.localeCompare(a2.startDate))
    for (let idx = 0; idx < availabilities.length - 1; idx++) {
      const a1End = moment(availabilities[idx].endDate)
      const a2Start = moment(availabilities[idx + 1].startDate)
      if (a1End.isAfter(a2Start)) return true
    }
    return false
  }

  const addAvailability = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const availability = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    }
    console.log('availability', availability)

    setAvailabilities([...availabilities, availability])
  }

  const handlePublish = async () => {
    const res = await api.listings.publish(listingId, availabilities)
    if (res.error) {
      setErrorMsg(res.error.data.error)
    } else {
      history.push('/hosted-listings')
    }
  }

  return (
    <PageContainer>
      <Header>Publish Listing</Header>

      <ListingSummary listing={listing}/>

      <MainContainer>
        <LeftSide>
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

          {errorMsg !== '' ? <StyledAlert severity="error">{errorMsg}</StyledAlert> : ''}

          <StyledButton
            id="add-availability"
            variant="contained"
            disabled={errorMsg !== ''}
            onClick={() => addAvailability()}
          >
            Add Availability
          </StyledButton>
        </LeftSide>
        <RightSide>
          <AvailabilityTable
            availabilities={availabilities}
            setAvailabilities={setAvailabilities}
          />

          <SubHeader>
            Make sure the availabilities for your property are correct.
            You will not be able to change the availability later!
          </SubHeader>

          <StyledButton
            id="publish-listing"
            variant="contained"
            disabled={(availabilities.length === 0 || errorMsg !== '')}
            onClick={async () => { await handlePublish() }}
          >
            Publish Listing
          </StyledButton>
        </RightSide>
      </MainContainer>
    </PageContainer>
  )
}

export default PublishListing

const PageContainer = styled.div`
  width: 90vw;
  max-width: 900px;
  margin: 7vh auto;
`

const MainContainer = styled.div`
  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
  }
`
const LeftSide = styled.div`
  min-width: 350px;
`
const RightSide = styled.div`
  padding-left: 30px;
`

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 20pt;
`

const SubHeader = styled(Header)`
  font-size: 12pt;
  max-width: 500px;
  margin: 20px auto;
`

const StyledAlert = styled(Alert)`
  && {
    width: 300px;
    margin: 20px auto;
  }
`

const StyledButton = styled(Button)`
  && {
    display: block;
    margin: 10px auto;
    min-width: 200px;
  }
`

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
`
