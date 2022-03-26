import { React, useEffect, useState } from 'react';

import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';

import RenderStep from './components/RenderStep';
import Directions from './components/Directions';

const CreateListing = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const [form, setForm] = useState({
    title: '',
    address: {
      number: '',
      street: '',
      city: '',
      state: '',
      postcode: 2000,
    },
    price: 100,
    thumbnail: '',
    metadata: {
      type: 'Rental unit',
      guests: 1,
      beds: 1,
      bedrooms: 0,
      bathrooms: 1,
      amenities: [],
      photos: [],
    },
  });

  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    switch (step) {
      case 2:
        setIsFilled(addressFilled(form.address));
        break;
      case 6:
        setIsFilled(form.title !== '');
        break;
      case 5:
        setIsFilled(form.metadata.photos.length >= 5);
        break;
      case 7:
        setIsFilled(Boolean(form.price));
        break;
      default:
        setIsFilled(true);
        break;
    }
  }, [step, form]);

  const addressFilled = ({ number, street, city, state, postcode }) => {
    return (
      number !== '' && street !== '' && city !== '' && state !== '' && Boolean(postcode)
    );
  };

  return (
    <>
      <RenderStep form={form} setForm={setForm} step={step} setStep={setStep} />
      {step <= 8 && (
        <Footer>
          <Directions
            currStep={step}
            prevStep={prevStep}
            nextStep={nextStep}
            isFilled={isFilled}
          />
          <ProgressBar variant='determinate' value={(step / 8) * 100} />
        </Footer>
      )}
    </>
  );
};

export default CreateListing;

const Footer = styled.div`
  padding-bottom: 20px;
`;

const ProgressBar = styled(LinearProgress)`
  && {
    height: 10px;
    border-radius: 10px;
    max-width: 600px;
    margin: 20px auto;
  }
`;
