import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '@mui/material';

const Directions = ({ currStep, prevStep, nextStep, isFilled }) => {
  const handleNext = (event) => {
    event.preventDefault();
    nextStep();
  };
  const handlePrev = (event) => {
    event.preventDefault();
    prevStep();
  };

  const renderNextText = (currStep) => {
    switch (currStep) {
      case 0:
        return 'Let\'s go!';
      case 7:
        return 'Review your listing';
      case 8:
        return 'Submit your listing';
      default:
        return 'Next';
    }
  };

  return (
    <ButtonGroup>
      <StyledButton variant='outlined' onClick={handlePrev} disabled={currStep === 0}>
        Back
      </StyledButton>

      <StyledButton variant='contained' onClick={handleNext} disabled={!isFilled}>
        {renderNextText(currStep)}
      </StyledButton>
    </ButtonGroup>
  );
};

export default Directions;

Directions.propTypes = {
  currStep: PropTypes.number,
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  isFilled: PropTypes.bool,
};

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 500px;
  margin: 0 auto;
`;

const StyledButton = styled(Button)`
  width: 180px;
  height: 50px;
`;
