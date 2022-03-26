import { React } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  MenuItem,
  Divider,
} from '@mui/material'

const MobileNavContent = ({ isAuthenticated, handleLogout }) => {
  return (
    <>
      { (isAuthenticated)
        ? <div id="logged-in">
            <NavLink to="/create-listing">
              <MenuItem>Create a Listing</MenuItem>
            </NavLink>
            <NavLink id="link-hostedlistings" to="/hosted-listings">
              <MenuItem>Hosted Listings</MenuItem>
            </NavLink>
            <Divider />
            <MenuItem id="signout"
              onClick={() => handleLogout()}>
              Sign Out
            </MenuItem>
          </div>
        : <div id="logged-out">
            <NavLink id="link-signin" to="/signin">
              <MenuItem>Sign In</MenuItem>
            </NavLink>
            <Divider />
            <NavLink id="link-signup" to="/signup">
              <MenuItem>Sign Up</MenuItem>
            </NavLink>
          </div>
      }
    </>
  )
}

export default MobileNavContent

MobileNavContent.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func
}

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`
