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

const DeleteListing = ({ open, setOpen, listingId, setIsDeleted }) => {
  const handleClose = () => setOpen(false)

  const handleDeleteListing = async () => {
    const res = await api.listings.delete(listingId)
    if (res.error) {
      console.log('error:', res.error.data.error)
    } else {
      setIsDeleted(true)
      handleClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="delete-title">{'Delete Listing?'}</DialogTitle>
      <DialogContent>
        <Section>
          <SubTitle id="delete-prompt">
            Are you sure you would like to delete listing with ID: {listingId}
          </SubTitle>
        </Section>
      </DialogContent>
      <DialogActions>
        <Button
          id="delete-cancel"
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          id="delete-confirm"
          variant="contained"
          color="error"
          onClick={async () => await handleDeleteListing()}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteListing

DeleteListing.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  listingId: PropTypes.number,
  setIsDeleted: PropTypes.func,
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
