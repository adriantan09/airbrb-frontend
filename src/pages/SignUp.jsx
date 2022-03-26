import { React, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import PropTypes from 'prop-types'

import api from '../api/api.js';
import { validEmail } from '../helpers.js'

import {
  Button,
  TextField,
  Link,
  Box,
  Avatar,
  Typography,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const SignUp = ({ setToken }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleRegister(data.get('email'), data.get('password'), data.get('name'))
  }

  const extractUsername = (email) => {
    return email.substring(0, email.indexOf('@'));
  }

  const handleRegister = async (email, password, name) => {
    const res = await api.auth.register(email, password, name)
    if (res.error) {
      setErrorMsg(res.error.data.error)
    } else {
      setToken(res.data.data.token)
      localStorage.setItem('email', email)
      localStorage.setItem('username', extractUsername(email))
      history.push('/')
    }
  }

  useEffect(() => {
    if (!validEmail(email) && email !== '') {
      setErrorMsg('Please enter a valid email.')
    } else if (pass !== confirmPass) {
      setErrorMsg('Passwords do not match.')
    } else {
      setErrorMsg('')
    }
  }, [email, pass, confirmPass])

  return (
    <PageContainer>
      <Card>
        <StyledAvatar><LockOutlinedIcon /></StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <StyledTextField
            onChange={e => setName(e.target.value)}
            required
            name="name"
            id="name"
            label="Name"
            autoFocus
          />
          <StyledTextField
            onChange={e => setEmail(e.target.value)}
            required
            name="email"
            id="email"
            label="Email Address"
          />
          <StyledTextField
            onChange={e => setPass(e.target.value)}
            required
            name="password"
            id="password"
            label="Password"
            type="password"
          />
          <StyledTextField
            onChange={e => setConfirmPass(e.target.value)}
            required
            name="confirmpassword"
            id="confirmpassword"
            label="Confirm Password"
            type="password"
          />
          {errorMsg !== '' ? <Alert severity="error">{errorMsg}</Alert> : ''}
          <StyledButton
            disabled={!(name && email && pass && confirmPass && errorMsg === '')}
            variant="contained"
            type="submit"
            id="signup"
          >
            Sign Up
          </StyledButton>
          <Link href="/signin" variant="body2">
            {'Already have an account? Sign In'}
          </Link>
        </Box>
      </Card>
    </PageContainer>
  );
}

export default SignUp

SignUp.propTypes = {
  setToken: PropTypes.func,
}

const PageContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  max-width: 400px;
`

const Card = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 8px 0;
  }
`

const StyledAvatar = styled(Avatar)`
  && {
    margin: 5px;
    background-color: #FF5A5F;
  }
`

const StyledButton = styled(Button)`
  && {
    margin: 10px 0;
    width: 100%;
  }
`
