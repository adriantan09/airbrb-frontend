import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {
  IconButton
} from '@mui/material';

const PlusMinusBox = ({ label, addToState, state, setState, removeFromState }) => {
  return (
    <SelectionContainer>
      <SelectionTitle id="button-label">
        {label}
      </SelectionTitle>
      <SelectionButtons>
        <IconButton id="decrement" aria-label="removeBedroom" size="large" onClick={removeFromState}>
          <RemoveCircleOutlineIcon fontSize="large"/>
        </IconButton>
        <NumberField
          readOnly
          id={label}
          name={label}
          value={state}
          type="number"
          onChange={e => setState({ state: e.target.value })}
        >
        </NumberField>
        <IconButton id="increment" aria-label="addBedroom" size="large" onClick={addToState}>
          <AddCircleOutlineIcon fontSize="large"/>
        </IconButton>
      </SelectionButtons>
    </SelectionContainer>
  );
}

export default PlusMinusBox;

PlusMinusBox.propTypes = {
  label: PropTypes.string,
  addToState: PropTypes.func,
  removeFromState: PropTypes.func,
  state: PropTypes.number,
  setState: PropTypes.func
};

const SelectionContainer = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const SelectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SelectionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberField = styled.input`
  text-align: center;
  font-size: 100%;
  width: 40%;
  outline: none;
  border: none;
`;
