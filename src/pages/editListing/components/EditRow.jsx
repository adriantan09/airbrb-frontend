import { React, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TableCell, TableRow, Collapse } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import Type from '../../../components/Forms/Type';
import Address from '../../../components/Forms/Address';
import BedsNBaths from '../../../components/Forms/BedsNBaths';
import Amenities from '../../../components/Forms/Amenities';
import Photos from '../../../components/Forms/Photos';
import Title from '../../../components/Forms/Title';
import Price from '../../../components/Forms/Price';

const EditRow = ({ listing, title, type, setForm }) => {
  const [open, setOpen] = useState(false);

  const { price, address, metadata, title: listingTitle } = listing;

  const renderFormType = (type, setForm) => {
    switch (type) {
      case 'title':
        return <Title title={listingTitle} setForm={setForm} />;
      case 'type':
        return <Type type={metadata.type} setForm={setForm} />;
      case 'price':
        return <Price price={price} setForm={setForm} />;
      case 'address':
        return <Address address={address} setForm={setForm} />;
      case 'amenities':
        return <Amenities savedAmenities={metadata.amenities} setForm={setForm} />;
      case 'gbbb':
        return <BedsNBaths metadata={metadata} setForm={setForm} />;
      case 'photos':
        return <Photos savedPhotos={metadata.photos} setForm={setForm} />;
    }
  };

  return (
    <>
      <TableRow>
        <DetailsCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </DetailsCell>
        <TableCell>{title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} unmountOnExit>
            {listing.metadata && (
              <DropdownContainer>{renderFormType(type, setForm)}</DropdownContainer>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EditRow;

EditRow.propTypes = {
  listing: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  setForm: PropTypes.func,
};

const DropdownContainer = styled.div`
  margin: 15px;
`;

const DetailsCell = styled(TableCell)`
  width: 50px;
`;
