import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Button,
  Paper,
  useMediaQuery,
} from '@mui/material';

import api from '../../api/api';
import RowListing from './components/RowListing';
import PaginationActions from './components/PaginationActions';
import DeleteListing from './components/DeleteListing';
import UnpublishListing from './components/UnpublishListing';

const HostedListings = () => {
  const [listings, setListings] = useState([]);
  const desktopScreen = useMediaQuery('(min-width: 600px)');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [confirmUnpublish, setConfirmUnpublish] = useState(false);
  const [isUnpublished, setIsUnpublished] = useState(false);
  const [listingId, setListingId] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(async () => {
    const res = await api.listings.all();
    console.log('res', res);
    const listings = res.data.data.listings;
    const userEmail = localStorage.getItem('email');
    let hostedListings = listings.filter((listing) => listing.owner === userEmail);
    const hostedIds = hostedListings.map((listing) => listing.id);

    hostedListings = [];
    for (const id of hostedIds) {
      const res = await api.listings.data(id);
      res.data.data.listing.id = id;
      hostedListings.push(res.data.data.listing);
    }
    setListings(hostedListings);
  }, [isDeleted, isUnpublished]);

  return (
    <PageContainer>
      <Header>Hosted Listings</Header>
      <StyledLink to='/create-listing'>
        <CreateListingBtn variant='contained'>Create listing</CreateListingBtn>
      </StyledLink>
      {listings.length === 0 ? (
        <NoListings colSpan={6}>You currently have no hosted listings</NoListings>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <DetailsCell>Details</DetailsCell>
                <ListingCell>Listing</ListingCell>
                {desktopScreen && <TableCell>Thumbnail</TableCell>}
                <ActionCell>Actions</ActionCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? listings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : listings
              ).map((listing, idx) => (
                <RowListing
                  key={idx}
                  listing={listing}
                  setListingId={setListingId}
                  setConfirmDelete={setConfirmDelete}
                  setConfirmUnpublish={setConfirmUnpublish}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={4}
                  count={listings.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}

      {confirmDelete && (
        <DeleteListing
          open={confirmDelete}
          setOpen={setConfirmDelete}
          listingId={listingId}
          setIsDeleted={setIsDeleted}
        />
      )}
      {confirmUnpublish && (
        <UnpublishListing
          open={confirmUnpublish}
          setOpen={setConfirmUnpublish}
          listingId={listingId}
          setIsUnpublished={setIsUnpublished}
        />
      )}
    </PageContainer>
  );
};

export default HostedListings;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PageContainer = styled.div`
  width: 90vw;
  max-width: 800px;
  margin: 7vh auto;
`;

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 20pt;
`;

const CreateListingBtn = styled(Button)`
  && {
    margin-bottom: 15px;
  }
`;

const ActionCell = styled(TableCell)`
  width: 140px;
  && {
    text-align: center;
  }
`;

const NoListings = styled.h3`
  text-align: center;
  margin: 30px 0;
  font-weight: 400;
`;

const DetailsCell = styled(TableCell)`
  width: 50px;
`;

const ListingCell = styled(TableCell)`
  && {
    width: 200px;
  }
`;
