import { React } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Modal,
//   useMediaQuery
} from '@mui/material'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReviewCard from '../pages/viewListing/components/ReviewCard';

const DisplayRating = ({ open, setOpen, reviews }) => {
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <CloseButton onClick={handleClose}/>
        <Container>
          <SubHeader>Reviews for {reviews[0].score} star ratings</SubHeader>
          { reviews.map((review, idx) => {
            return (
              <Wrapper key={idx}>
                <ReviewCard review={review}/>
              </Wrapper>
            )
          })}
        </Container>
      </ModalContainer>
    </Modal>
  )
}

export default DisplayRating

DisplayRating.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  reviews: PropTypes.array,
}

const SubHeader = styled.h3`
  font-weight: 400;
  font-size: 13pt;
`

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  background-color: white;
  border-radius: 20px;
  padding: 4px;
  max-width: 650px;
`

const CloseButton = styled(CloseRoundedIcon)`
  && {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 26pt;
  }
`

const Wrapper = styled.div`
  margin: 0 20px;
`

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 80vh;
  max-height: 600px;
  overflow-y: scroll;
  padding: 0;
  margin-top: 50px;
`
