import { React, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import moment from 'moment'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  Alert
} from '@mui/material'

import api from '../../../api/api.js'

const Review = ({ open, setOpen, listing, booking, setReviewMade }) => {
  const handleClose = () => setOpen(false)

  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => { setErrorMsg('') }, [score, comment])

  const handleReview = async () => {
    const review = {
      score: score,
      comment: comment,
      username: localStorage.getItem('username'),
      time: moment().format('MMMM YYYY')
    }

    const res = await api.listings.postReview(listing.id, booking.id, review)
    if (res.error) {
      setErrorMsg(res.error.data.error)
    } else {
      setReviewMade(true)
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container>
        <DialogTitle>{'Write a review'}</DialogTitle>
        <DialogContent>
          <Section>
            <SubHeader>Score:</SubHeader>
            <Rating
              required
              name="simple-controlled"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value, 10))}
            />
          </Section>
          <TextField
            required
            label="Leave a comment"
            multiline
            rows={5}
            fullWidth
            onChange={e => setComment(e.target.value)}
          />
          {errorMsg !== '' ? <StyledAlert severity="error">{errorMsg}</StyledAlert> : ''}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!(score && comment && errorMsg === '')}
            onClick={async () => await handleReview()}
          >
            Submit
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  )
}

Review.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  listing: PropTypes.object,
  booking: PropTypes.object,
  setReviewMade: PropTypes.func,
}

export default Review

const Container = styled.div`
  width: 80vw;
  max-width: 500px;
`

const Section = styled.div`
  display: flex;
  /* justify-content: space-between; */
  height: 30px;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`

const SubHeader = styled.h3`
  font-weight: 400;
  font-size: 13pt;
  margin-right: 15px;
`

const StyledAlert = styled(Alert)`
  margin-top: 15px;
`

// const SubTitle = styled(SubHeader)`
//   font-weight: 500;
// `
