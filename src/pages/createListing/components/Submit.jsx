import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import api from '../../../api/api';

const Submit = ({ form }) => {
  const [result, setResult] = useState('');
  const history = useHistory();

  useEffect(async () => {
    const res = await api.listings.create(form);
    if (res.error) {
      setResult(res.error.data.error);
    } else {
      history.push('/hosted-listings');
      setResult('');
    }
  }, []);

  return (
    <Container>
      <h1>Submitting Listing</h1>
      {result === '' ? (
        <CircularProgress size={60} />
      ) : (
        <Alert severity='error'>{result}</Alert>
      )}
    </Container>
  );
};

export default Submit;

Submit.propTypes = {
  form: PropTypes.object,
  handleChange: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 50px;
  }
`;
