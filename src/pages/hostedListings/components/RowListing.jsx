import { React, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TableCell, TableRow, useMediaQuery } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import DropdownData from './DropdownData';
import ActionToggle from './ActionToggle';

const RowListing = ({ listing, setListingId, setConfirmDelete, setConfirmUnpublish }) => {
  const { title, thumbnail } = listing;
  const [open, setOpen] = useState(false);
  const desktopScreen = useMediaQuery('(min-width: 600px)');

  return (
    <>
      <TableRow>
        <DetailsCell>
          <IconButton size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </DetailsCell>
        <TableCell>{title}</TableCell>
        {desktopScreen && (
          <ImageCell>
            <img src={thumbnail.base64} alt='Property Picture' />
          </ImageCell>
        )}
        <ActionCell>
          <ActionToggle
            listingId={listing.id}
            isPublished={listing.published}
            setListingId={setListingId}
            setConfirmDelete={setConfirmDelete}
            setConfirmUnpublish={setConfirmUnpublish}
          />
        </ActionCell>
      </TableRow>
      <TableRow>
        <DropdownData listing={listing} open={open} />
      </TableRow>
    </>
  );
};

export default RowListing;

RowListing.propTypes = {
  listing: PropTypes.object,
  setListingId: PropTypes.func,
  setConfirmDelete: PropTypes.func,
  setConfirmUnpublish: PropTypes.func,
};

const ImageCell = styled(TableCell)`
  img {
    height: 100px;
    width: auto;
  }
`;

const DetailsCell = styled(TableCell)`
  width: 50px;
`;

const ActionCell = styled(TableCell)`
  width: 140px;
  && {
    text-align: center;
  }
`;
