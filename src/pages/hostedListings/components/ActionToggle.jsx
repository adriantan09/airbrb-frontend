import { React, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import {
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton';

const ActionToggle = ({ listingId, isPublished, setListingId, setConfirmDelete, setConfirmUnpublish }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const actionsOpen = Boolean(anchorEl)

  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  const handleDelete = () => {
    setListingId(listingId)
    setConfirmDelete(true)
    handleClose()
  }

  const handleUnpublish = () => {
    setListingId(listingId)
    setConfirmUnpublish(true)
    handleClose()
  }

  return (
    <>
      <IconButton
        id="action-toggle"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Toggle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={actionsOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <ActionLink id="listing-edit" to={`listing/edit/${listingId}`}>
          <MenuItem
            onClick={() => handleClose()}>
            <EditIcon /> <Text>Edit</Text>
          </MenuItem>
        </ActionLink>

        { (!isPublished)
          ? <ActionLink id="listing-publish" to={`listing/publish/${listingId}`}>
              <MenuItem
                onClick={() => handleClose()}>
                <PublishIcon /> <Text>Publish</Text>
              </MenuItem>
            </ActionLink>
          : <MenuItem
              onClick={handleUnpublish}>
              <PublishIcon /> <Text>Unpublish</Text>
            </MenuItem>
        }

        <ActionLink
          id="listing-booking-requests"
          to={`listing/bookings/${listingId}`}
        >
          <MenuItem onClick={() => handleClose()}>
            <HomeRoundedIcon /> <Text>Booking Requests</Text>
          </MenuItem>
        </ActionLink>

        <Divider/>
        <MenuItem id="listing-delete" onClick={handleDelete}>
          <DeleteIcon /> <Text>Delete</Text>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ActionToggle

ActionToggle.propTypes = {
  listingId: PropTypes.number,
  isPublished: PropTypes.bool,
  setListingId: PropTypes.func,
  setConfirmDelete: PropTypes.func,
  setConfirmUnpublish: PropTypes.func,
}

const Toggle = styled(MoreVertIcon)`
  && {
    font-size: 20pt;
    color: black;
  }
`

const ActionLink = styled(Link)`
  && {
    text-decoration: none;
    color: black;
  }
`

const Text = styled.p`
  font-weight: 500;
  font-size: 11pt;
  margin: 0 0 0 8px;
`
