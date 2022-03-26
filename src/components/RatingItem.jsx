import { React, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  LinearProgress
} from '@mui/material'

const RatingItem = ({ starType, setStarType, totalReviews, numReviews }) => {
  const calcPercentage = (numReviews, totalReviews) => {
    return Math.round((numReviews / totalReviews) * 100)
  }

  const handleModal = (numReviews) => {
    if (numReviews !== 0) setStarType(starType)
  }

  useEffect(() => { setStarType(0) }, [])

  return (
    <Container onClick={() => handleModal(numReviews)}>
      <Text id="rating-star">{starType} Star</Text>
      <StyledBar
        id="rating-progress"
        value={calcPercentage(numReviews, totalReviews)}
        variant="determinate"
      />
      <Percentage id="rating-percent">{numReviews} ({calcPercentage(numReviews, totalReviews)}%)</Percentage>
    </Container>
  )
}

RatingItem.propTypes = {
  starType: PropTypes.number,
  setStarType: PropTypes.func,
  numReviews: PropTypes.number,
  totalReviews: PropTypes.number,
}

export default RatingItem

const Container = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #F7F7F7;
  }

`

const Text = styled.p`
  font-size: 11pt;
  margin: 8px 0;
  min-width: 50px;
`

const StyledBar = styled(LinearProgress)`
  && {
    width: 55%;
    height: 10px;
    border-radius: 8px;
  }
`

const Percentage = styled(Text)`
  margin-left: auto;
  min-width: 80px;
  text-align: right;
`
