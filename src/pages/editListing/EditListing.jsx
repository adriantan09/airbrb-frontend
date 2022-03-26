import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Table, TableBody, TableContainer, Paper, Alert } from '@mui/material';

import api from '../../api/api';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import EditRow from './components/EditRow';

const EditListing = () => {
  const { id } = useParams();
  const history = useHistory();

  const [errorMsg, setErrorMsg] = useState('');

  const [listing, setListing] = useState({});
  useEffect(async () => {
    const res = await api.listings.data(id);
    console.log('res', res);
    setListing(res.data.data.listing);
  }, []);

  const handleSubmit = () => {
    const res = api.listings.update(listing, parseInt(id, 10));
    if (res.error) {
      setErrorMsg(res.error.data.error);
    } else {
      history.push('/hosted-listings');
    }
  };

  return (
    <Container>
      <h1>Edit {listing.title}</h1>
      {errorMsg !== '' && (
        <Alert severity='error'>This is an error alert — check it out!</Alert>
      )}
      <SubmitButton onClick={handleSubmit} variant={'contained'}>
        Save Changes
      </SubmitButton>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <EditRow
              listing={listing}
              title={'Edit Title'}
              type={'title'}
              setForm={setListing}
            />
            <EditRow
              listing={listing}
              title={'Edit Property Type'}
              type={'type'}
              setForm={setListing}
            />
            <EditRow
              listing={listing}
              title={'Edit Price'}
              type={'price'}
              setForm={setListing}
            />
            <EditRow
              listing={listing}
              title={'Edit Address'}
              type={'address'}
              setForm={setListing}
            />
            <EditRow
              listing={listing}
              title={'Edit Amenities'}
              type={'amenities'}
              setForm={setListing}
            />
            <EditRow
              listing={listing}
              title={'Edit number of guests, bedrooms, beds and bathrooms'}
              type={'gbbb'}
              setForm={setListing}
            />
            <EditRow
              listing={listing}
              title={'Edit Photos'}
              type={'photos'}
              setForm={setListing}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EditListing;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h1 {
    text-align: center;
  }
`;

const SubmitButton = styled(Button)`
  && {
    margin-bottom: 20px;
  }
`;
