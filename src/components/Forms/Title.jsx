import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@mui/material';

import { handleChange } from '../../helpers';

const Title = ({ title, setForm }) => {
  return (
    <Container>
      <StyledTextField
        required
        label='Property name'
        name='title'
        autoFocus
        value={title}
        type='text'
        onChange={(e) => handleChange(e, 'default', setForm)}
      />
    </Container>
  );
};

export default Title;

Title.propTypes = {
  title: PropTypes.string,
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
