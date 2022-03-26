import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import api from '../api/api.js';
import { validEmail } from '../helpers.js';

import { Button, TextField, Link, Box, Typography, Avatar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleLogin(data.get('email'), data.get('password'));
  };

  const extractUsername = (email) => {
    return email.substring(0, email.indexOf('@'));
  };

  const handleLogin = async (email, password) => {
    const res = await api.auth.login(email, password);
    if (res.error) {
      setErrorMsg(res.error.data.error);
    } else {
      setToken(res.data.data.token);
      localStorage.setItem('email', email);
      localStorage.setItem('username', extractUsername(email));
      history.push('/');
    }
  };

  useEffect(() => {
    if (!validEmail(email) && email !== '') {
      setErrorMsg('Please enter a valid email.');
    } else {
      setErrorMsg('');
    }
  }, [email, password]);

  return (
    <PageContainer>
      <Card>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate>
          <StyledTextField
            onChange={(e) => setEmail(e.target.value)}
            required
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <StyledTextField
            onChange={(e) => setPassword(e.target.value)}
            required
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          {errorMsg !== '' ? <Alert severity='error'>{errorMsg}</Alert> : ''}
          <StyledButton
            disabled={!(email && password && errorMsg === '')}
            type='submit'
            variant='contained'
          >
            Sign In
          </StyledButton>
          <Link href='/signup' variant='body2'>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Card>
    </PageContainer>
  );
};

export default SignIn;

SignIn.propTypes = {
  setToken: PropTypes.func,
};

const PageContainer = styled.div`
  width: 90vw;
  margin: 0 auto;
  max-width: 400px;
`;

const Card = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 8px 0;
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    margin: 5px;
    background-color: #ff5a5f;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 10px 0;
    width: 100%;
  }
`;
