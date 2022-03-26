import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@mui/material';

const JSONUpload = ({ form, setForm }) => {
  const [input, setInput] = useState('')

  return (
    <Container>
      <StyledTextField
          id="outlined-textarea"
          value={input}
          multiline
          InputProps={{
            readOnly: true,
          }}
          rows={10}
        />
      <StyledTextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          onChange={setInput}
          multiline
          rows={10}
        />
    </Container>
  );
};

export default JSONUpload;

JSONUpload.propTypes = {
  form: PropTypes.object,
  setForm: PropTypes.func,
  // prevStep: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledTextField = styled(TextField)`
  && {
    height: 100%;
  }

`
