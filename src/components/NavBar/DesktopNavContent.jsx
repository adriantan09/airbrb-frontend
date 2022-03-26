import { React } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DesktopNavContent = ({ isAuthenticated, handleLogout }) => {
  return (
    <>
      { (isAuthenticated)
        ? <RightContainerAuth>
            <NavLink id="home" to="/">
              <NavOption>Home</NavOption>
            </NavLink>
            <NavLink id="create-listing" to="/create-listing">
              <NavOption>Create a Listing</NavOption>
            </NavLink>
            <NavLink id="hosted-listings" to="/hosted-listings">
              <NavOption>Hosted Listings</NavOption>
            </NavLink>
            <SignOutBtn onClick={() => handleLogout()}>
              Sign Out
            </SignOutBtn>
          </RightContainerAuth>
        : <RightContainer>
            <NavLink id="home" to="/">
              <NavOption>Home</NavOption>
            </NavLink>
            <NavLink id="signin" to="/signin">
              <NavOption>Sign In</NavOption>
            </NavLink>
            <NavLink id="signup" to="/signup">
              <NavOption>Sign Up</NavOption>
            </NavLink>
          </RightContainer>
      }
    </>
  )
}

export default DesktopNavContent

DesktopNavContent.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLogout: PropTypes.func
}

const RightContainer = styled.div`
  width: 310px;
  display: flex;
  justify-content: space-between;
`

const RightContainerAuth = styled(RightContainer)`
  width: 450px;
`

const SignOutBtn = styled.div`
  padding: 10px;
  border-color: #B0B0B0;
  border-radius: 30px;
  color: #464646;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    background-color: #F7F7F7;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const NavOption = styled.div`
  border-radius: 30px;
  padding: 10px;

  & a {
    text-decoration: none;
    border-color: #B0B0B0;
    color: #464646;
    font-weight: 500;
  }

  &:hover {
    cursor: pointer;
    background-color: #F7F7F7;
  }
`
