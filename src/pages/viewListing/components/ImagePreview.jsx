import { React, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Button,
  Modal,
  ImageList,
  ImageListItem,
  useMediaQuery
} from '@mui/material'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ImagePreview = ({ pictures }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const desktopScreen = useMediaQuery('(min-width:600px)');
  let cols = 1
  if (desktopScreen) { cols = 2 }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>Show all photos</Button>
      <Modal open={open} onClose={handleClose}>
        <ModalContainer>
          <CloseButton onClick={handleClose}/>
          <ImageContainer>
            <ImageList variant="masonry" cols={cols} gap={8}>
              { (pictures) &&
                pictures.map((picture, idx) => (
                  <PropertyImage key={idx}>
                    <img
                      src={`${picture.base64}`}
                      srcSet={`${picture.base64}`}
                      loading="lazy"
                    />
                  </PropertyImage>
                ))
              }
            </ImageList>
          </ImageContainer>
        </ModalContainer>
      </Modal>
    </>
  )
}

export default ImagePreview

ImagePreview.propTypes = {
  pictures: PropTypes.array,
}

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

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  /* background-color: grey; */
  padding: 0;
  margin-top: 50px;
`

const PropertyImage = styled(ImageListItem)`
  && {
    width: 90%;
    height: auto;
  }
`
