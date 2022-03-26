import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@mui/material';

import { handleChange } from '../../helpers';

const Price = ({ price, setForm }) => {
  return (
    <Container>
      <StyledTextField
        required
        type='number'
        label='Price (per night)'
        name='price'
        autoFocus
        value={price}
        onChange={(e) => handleChange(e, 'default', setForm)}
      />
    </Container>
  );
};

export default Price;

Price.propTypes = {
  price: PropTypes.any,
  setForm: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 10px 0;
    width: 100%;
  }
`;
