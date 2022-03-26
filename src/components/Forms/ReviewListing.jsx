import { React } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

const ReviewListing = ({ form }) => {
  const { number, postcode, street, city, state } = form.address;
  const { amenities, bathrooms, bedrooms, beds, guests, type } = form.metadata;

  return (
    <Container>
      <StyledTable component={Paper}>
        <Table aria-label='Property Details Table'>
          <TableBody>
            <TableRow>
              <TableCell>Title</TableCell>
              <DataCell> {form.title}</DataCell>
            </TableRow>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>{form.price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Property Type</TableCell>
              <TableCell>{type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>
                {number + ' ' + street + ', ' + city + ', ' + state + ', ' + postcode}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Amenities</TableCell>
              <AmenitiesCell>
                {amenities.map((a, idx) => {
                  return <p key={idx}>• {a}</p>;
                })}
              </AmenitiesCell>
            </TableRow>
            <TableRow>
              <TableCell>Bathrooms</TableCell>
              <TableCell>{bathrooms}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bedrooms</TableCell>
              <TableCell>{bedrooms}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Beds</TableCell>
              <TableCell>{beds}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Guests</TableCell>
              <TableCell>{guests}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledTable>
    </Container>
  );
};

export default ReviewListing;

ReviewListing.propTypes = {
  form: PropTypes.object,
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    text-align: center;
  }
`;

const DataCell = styled(TableCell)`
  && {
    font-weight: 400;
  }
`;

const StyledTable = styled(TableContainer)`
  height: 100%;
`;

const AmenitiesCell = styled(TableCell)`
  && {
    p {
      text-align: left;
    }
  }
`
