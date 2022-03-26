import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@mui/material';

import { handleChange } from '../../helpers';

const Address = ({ address, setForm }) => {
  return (
    <Container>
      <StyledTextField
        required
        type='text'
        label='Apt, suite, etc.'
        name='number'
        autoFocus
        value={address.number}
        onChange={(e) => handleChange(e, 'address', setForm)}
      />
      <StyledTextField
        required
        type='text'
        label='Street'
        name='street'
        value={address.street}
        onChange={(e) => handleChange(e, 'address', setForm)}
      />
      <StyledTextField
        required
        type='text'
        label='City'
        name='city'
        value={address.city}
        onChange={(e) => handleChange(e, 'address', setForm)}
      />
      <StyledTextField
        required
        type='text'
        label='State'
        name='state'
        value={address.state}
        onChange={(e) => handleChange(e, 'address', setForm)}
      />
      <StyledTextField
        required
        type='number'
        label='Postcode'
        name='postcode'
        value={address.postcode}
        onChange={(e) => handleChange(e, 'address', setForm)}
      />
    </Container>
  );
};

export default Address;

Address.propTypes = {
  address: PropTypes.object,
  handleChange: PropTypes.func,
  setForm: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 10px 0;
  }
`;
