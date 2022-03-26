import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { handleChange } from '../../helpers';

const Amenities = ({ savedAmenities, setForm }) => {
  const [amenities, setAmenities] = useState(savedAmenities);
  const allAmmenities = [
    'Smoke alarm',
    'First aid kit',
    'Fire extinguisher',
    'Kitchen',
    'Washing machine',
    'Free parking',
    'Wi-Fi',
    'TV',
    'Firepit',
    'Gym',
  ];

  const onChange = (event) => {
    if (event.target.checked) {
      setAmenities([...amenities, event.target.value]);
    } else {
      amenities.splice(amenities.indexOf(event.target.value), 1);
      setAmenities([...amenities]);
    }
  };

  useEffect(() => {
    const event = { target: { name: 'amenities', value: amenities } };
    handleChange(event, 'metadata', setForm);
  }, [amenities]);

  return (
    <Container>
      <StyledFormGroup>
        {allAmmenities.map((amenity, idx) => (
          <FormControlLabel
            key={idx}
            label={amenity}
            value={amenity}
            checked={amenities.includes(amenity)}
            control={<Checkbox />}
            onChange={(e) => onChange(e)}
          />
        ))}
      </StyledFormGroup>
    </Container>
  );
};

export default Amenities;

Amenities.propTypes = {
  savedAmenities: PropTypes.array,
  setForm: PropTypes.func,
};

const StyledFormGroup = styled(FormGroup)`
  && {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 0 10%;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
`;
