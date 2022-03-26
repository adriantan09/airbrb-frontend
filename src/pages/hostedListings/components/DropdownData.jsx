import { React } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import { Table, TableBody, TableCell, TableRow, Collapse } from '@mui/material';

import ReviewRating from '../../../components/ReviewRating';

const RowListing = ({ listing, open }) => {
  const {
    title,
    reviews,
    metadata: { bathrooms, bedrooms, type },
  } = listing;

  return (
    <DropdownCell colSpan={6}>
      <Collapse in={open} unmountOnExit>
        <DropdownContainer>
          <Typography variant='h6' gutterBottom component='div'>
            Listing Details
          </Typography>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <HeaderCell>Title</HeaderCell>
                <TableCell variant='head'>{title}</TableCell>
              </TableRow>
              <TableRow>
                <HeaderCell>Property Type</HeaderCell>
                <TableCell variant='head'>{type}</TableCell>
              </TableRow>
              <TableRow>
                <HeaderCell>Rating</HeaderCell>
                <TableCell variant='head'>
                  <ReviewRating reviews={reviews} />
                </TableCell>
              </TableRow>
              <TableRow>
                <HeaderCell>Beds</HeaderCell>
                <TableCell variant='head'>{bedrooms}</TableCell>
              </TableRow>
              <TableRow>
                <HeaderCell>Bathrooms</HeaderCell>
                <TableCell variant='head'>{bathrooms}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DropdownContainer>
      </Collapse>
    </DropdownCell>
  );
};

export default RowListing;

RowListing.propTypes = {
  listing: PropTypes.object,
  open: PropTypes.bool,
};

const DropdownContainer = styled.div`
  margin: 15px;
`;

const DropdownCell = styled(TableCell)`
  && {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const HeaderCell = styled(TableCell)`
  width: 30%;
  min-width: 150px;
`;
