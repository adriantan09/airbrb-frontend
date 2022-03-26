import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import api from '../../../api/api'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

const UnpublishListing = ({ open, setOpen, listingId, setIsUnpublished }) => {
  const handleClose = () => setOpen(false)

  const handleUnpublishListing = async () => {
    const res = await api.listings.unpublish(listingId)
    if (res.error) {
      console.log('error:', res.error.data.error)
    } else {
      setIsUnpublished(true)
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Unpublish Listing'}</DialogTitle>
      <DialogContent>
        <Section>
          <SubTitle>
            Are you sure you would like to unpublish listing with ID: {listingId}
          </SubTitle>
        </Section>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="warning"
          onClick={async () => await handleUnpublishListing()}
        >
          Unpublish
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UnpublishListing

UnpublishListing.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  listingId: PropTypes.number,
  setIsUnpublished: PropTypes.func,
}

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
`

const SubTitle = styled.p`
  font-weight: 300;
  font-size: 13pt;
  margin: 0;
`
