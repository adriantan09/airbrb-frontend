import { React, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Menu,
  MenuItem,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MobileNavContent from './MobileNavContent'
import DesktopNavContent from './DesktopNavContent'

const NavBar = ({ auth, setToken }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const history = useHistory();
  const desktopScreen = useMediaQuery('(min-width: 600px)');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  const handleLogout = () => {
    console.log('signing out')
    setToken(null)
    localStorage.removeItem('email')
    history.push('/')
  }

  return (
    <>
      <NavContainer>
      <NavLink to="/">
        <NavOption>
          <Header>Airbrb</Header>
        </NavOption>
      </NavLink>
        { (!desktopScreen)
          ? <HamburgerMenu onClick={handleClick} />
          : <DesktopNavContent isAuthenticated={auth} handleLogout={handleLogout}/>
        }
      </NavContainer>

      <DropdownMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{ elevation: 0 }}
      >
        <NavLink to="/">
          <StyledMenuItem>Home</StyledMenuItem>
        </NavLink>
        <MobileNavContent isAuthenticated={auth} handleLogout={handleLogout}/>
      </DropdownMenu>
    </>
  );
}

export default NavBar

NavBar.propTypes = {
  auth: PropTypes.bool,
  setToken: PropTypes.func,
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-bottom: 1px solid #E4E4E4;
  height: 8vh;
  padding: 2px 20px;
`

const Header = styled.h2`
  font-size: 16pt;
  margin: 0;
`

const HamburgerMenu = styled(MenuIcon)`
  && {
    font-size: 24pt;
  }
  &:hover {
    cursor: pointer;
  }
`

const StyledMenuItem = styled(MenuItem)`
  width: 148px;
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

const DropdownMenu = styled(Menu)`
  overflow: visible;
  filter: drop-shadow(0px 2px 8px rgba(0,0,0,0.32));
  margin-top: 10px;
  
  & .MuiAvatar-root {
    width: 32px;
    height: 32px;
    margin-left: -5px;
    margin-right: 10px;
  }

  & a {
    text-decoration: none;
    color: #464646;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 14;
    width: 10;
    height: 10;
    transform: translateY(-50%) rotate(45deg);
    z-index: 0;
  }
`
