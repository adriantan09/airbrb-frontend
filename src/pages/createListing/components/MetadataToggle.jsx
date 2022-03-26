import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconButton } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { handleChange } from '../../../helpers';

const MetadataToggle = ({ header, setForm, initialValue, min, max }) => {
  const [state, setState] = useState(initialValue);

  const increment = () => setState(state + 1);
  const decrement = () => setState(state - 1);

  useEffect(() => {
    const event = { target: { name: header.toLowerCase(), value: state } };
    handleChange(event, 'metadata', setForm);
  }, [state]);

  return (
    <Entry>
      <h3>{header}</h3>
      <ButtonGroup>
        <IconButton onClick={decrement} disabled={state === min}>
          <RemoveCircleIcon />
        </IconButton>
        {state}
        <IconButton onClick={increment} disabled={state === max}>
          <AddCircleIcon />
        </IconButton>
      </ButtonGroup>
    </Entry>
  );
};

export default MetadataToggle;

MetadataToggle.propTypes = {
  header: PropTypes.string,
  setForm: PropTypes.func,
  initialValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: space-between;
`;
