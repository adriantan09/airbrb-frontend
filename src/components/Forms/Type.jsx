import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

import { handleChange } from '../../helpers';

const Type = ({ type, setForm }) => {
  const types = [
    'Rental unit',
    'Condominium (Condo)',
    'Loft',
    'Serviced apartment',
    'Holiday home',
  ];

  return (
    <Container>
      <FormControl>
        <RadioGroup
          onChange={(e) => handleChange(e, 'metadata', setForm)}
          value={type !== '' ? type : types[0]}
          name='type'
        >
          {types.map((type, idx) => (
            <FormControlLabel key={idx} value={type} label={type} control={<Radio />} />
          ))}
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default Type;

Type.propTypes = {
  type: PropTypes.string,
  handleChange: PropTypes.func,
  setForm: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  margin: 0 auto;
  max-width: 500px;
  label {
    height: 60px;
  }
`;
