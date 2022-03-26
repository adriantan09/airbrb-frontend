import { React } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import Type from '../../../components/Forms/Type';
import Address from '../../../components/Forms/Address';
import BedsNBaths from '../../../components/Forms/BedsNBaths';
import Amenities from '../../../components/Forms/Amenities';
import Photos from '../../../components/Forms/Photos';
import Title from '../../../components/Forms/Title';
import Price from '../../../components/Forms/Price';
import ReviewListing from '../../../components/Forms/ReviewListing';
import Submit from './Submit';
import JSONUpload from './JSONUpload';

import { Button } from '@mui/material';

const RenderStep = ({ form, setForm, step, setStep }) => {
  return (
    <Wrapper>
      {
        {
          0: (
            <>
              <h1>Become a Host in 7 easy steps</h1>
              <p>Join us, we will help you every step of the way.</p>
            </>
          ),
          1: <h1>What kind of place will you host?</h1>,
          2: <h1>Enter Your Address</h1>,
          3: <h1>How many guests would you like to welcome?</h1>,
          4: <h1>Let guests know what your place has to offer</h1>,
          5: <h1>Lets add some photos of your place</h1>,
          6: <h1>Lets give your place a name</h1>,
          7: <h1>Now for the fun part—set your price</h1>,
          8: (
            <>
              <h1>Check out your listing!</h1>
              <p>Review your details and save your listing.</p>
            </>
          ),
          10: <h1>Upload a json file</h1>,
        }[step]
      }
      {
        {
          0: <Button onClick={() => setStep(10)}>Upload json file</Button>,
          1: <Type type={form.metadata.type} setForm={setForm} />,
          2: <Address address={form.address} setForm={setForm} />,
          3: <BedsNBaths metadata={form.metadata} setForm={setForm} />,
          4: <Amenities savedAmenities={form.metadata.amenities} setForm={setForm} />,
          5: <Photos savedPhotos={form.metadata.photos} setForm={setForm} />,
          6: <Title title={form.title} setForm={setForm} />,
          7: <Price price={form.price} setForm={setForm} />,
          8: <ReviewListing form={form} />,
          9: <Submit form={form} />,
          10: <JSONUpload form={form} setForm={setForm}/>,
        }[step]
      }
    </Wrapper>
  );
};

export default RenderStep;

RenderStep.propTypes = {
  form: PropTypes.object,
  setForm: PropTypes.func,
  step: PropTypes.number,
  setStep: PropTypes.func,
};

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 18pt;
  }

  p {
    text-align: center;
  }

  height: 70vh;
  max-width: 600px;
  margin: auto;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow-y: hidden;
`;
