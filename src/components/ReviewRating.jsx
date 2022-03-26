import { React, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Rating,
  Popover,
} from '@mui/material'
import RatingItem from './RatingItem'

const ReviewRating = ({ setStarType, reviews, disabled }) => {
  const [active, setActive] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const stars = [1, 2, 3, 4, 5]

  const handleHover = (event) => {
    if (!disabled) {
      setActive(true)
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setActive(false)
    setAnchorEl(null)
  }

  const averageRating = () => {
    let totalScore = 0
    reviews.forEach(review => { totalScore += review.score })
    return Math.round((totalScore / reviews.length) * 100) / 100
  }

  const reviewWord = (numberOfReviews) => {
    return (numberOfReviews === 1) ? 'review' : 'reviews'
  }

  const calcNumReviews = (star, reviews) => {
    return reviews.filter(review => review.score === star).length
  }

  return (
    <>
    { (reviews.length === 0)
      ? <Text>No reviews yet</Text>
      : <Container active={active} onMouseEnter={handleHover}>
          <StyledRating
            value={averageRating()}
            precision={0.5}
            readOnly
            size="small"
          />
          <Text>{averageRating()} ({reviews.length} {reviewWord(reviews.length)})</Text>
        </Container>
    }
    <RatingBreakdown
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      { stars.map((star, idx) => {
        return (
          <RatingItem
            key={idx}
            starType={star}
            setStarType={setStarType}
            totalReviews={reviews.length}
            numReviews={calcNumReviews(idx + 1, reviews)}
          />
        )
      })}
    </RatingBreakdown>
    </>
  );
}

export default ReviewRating

ReviewRating.propTypes = {
  starType: PropTypes.number,
  setStarType: PropTypes.func,
  reviews: PropTypes.array,
  disabled: PropTypes.bool,
}

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 210px;

  ${({ active }) => active && `
    border-radius: 8px;
    cursor: pointer;
    background-color: #e6e6e6;
  `}

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 150px;
  }
`

const RatingBreakdown = styled(Popover)`
  & .MuiPopover-paper {
    min-width: 290px;
    padding: 10px 20px;
  }
`

const StyledRating = styled(Rating)`
  margin-right: 10px;
`

const Text = styled.p`
  font-size: 11pt;
  margin: 8px 0;
  min-width: 50px;
`
