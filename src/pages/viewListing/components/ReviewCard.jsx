import { React } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Rating,
  Avatar,
  Paper,
} from '@mui/material'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const ReviewCard = ({ review }) => {
  return (
    <Review elevation={2}>
      <StyledAvatar><PersonRoundedIcon /></StyledAvatar>
      <ReviewData>
        <UserText id="review-username">{review.username}</UserText>
        <TimeText id="review-time">{review.time}</TimeText>
        <Rating id="review-rating" value={review.score} readOnly size="small" />
      </ReviewData>
      <CommentText id="review-comment">{review.comment}</CommentText>
    </Review>
  )
}

export default ReviewCard

ReviewCard.propTypes = {
  review: PropTypes.object,
}

const Review = styled(Paper)`
  display: flex;
  margin: 20px 0;
  padding: 10px;

  p {
    margin: 7px 0;
  }
`

const ReviewData = styled.div`
  margin-left: 10px;
  min-width: 130px;
`

const UserText = styled.p`
  font-weight: 500;
`
const TimeText = styled.p`
  font-size: 11pt;
`
const CommentText = styled.p`
  padding-right: 10px;
`

const StyledAvatar = styled(Avatar)`
  && {
    margin: 5px;
    background-color: #FF5A5F;
    align-self: center;
    
    @media (max-width: 500px) {
      display: none;
    }
  }
`
