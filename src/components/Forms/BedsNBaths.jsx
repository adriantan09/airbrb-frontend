import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MetadataToggle from '../../pages/createListing/components/MetadataToggle';

const BedsNBaths = ({ metadata, setForm }) => {
  return (
    <Container>
      <MetadataToggle
        header={'Guests'}
        setForm={setForm}
        initialValue={metadata.guests}
        min={1}
        max={16}
      />
      <MetadataToggle
        header={'Beds'}
        setForm={setForm}
        initialValue={metadata.beds}
        min={1}
        max={50}
      />
      <MetadataToggle
        header={'Bedrooms'}
        setForm={setForm}
        initialValue={metadata.bedrooms}
        min={0}
        max={50}
      />
      <MetadataToggle
        header={'Bathrooms'}
        setForm={setForm}
        initialValue={metadata.bathrooms}
        min={1}
        max={50}
      />
    </Container>
  );
};

export default BedsNBaths;

BedsNBaths.propTypes = {
  metadata: PropTypes.object,
  setForm: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
`;
