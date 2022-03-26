import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import api from '../api/api.js';
import { useLocation } from 'react-router';
import CardListing from '../components/CardListing.jsx';
import SearchString from './searchBar/SearchString';
import SearchNumMinMax from './searchBar/SearchNumMinMax.jsx';

import { FormControl, MenuItem, Select } from '@mui/material';

const Home = ({ auth }) => {
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const location = useLocation();
  const [publishedListings, setPublishedListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchType, setSearchType] = useState('default');

  useEffect(async () => {
    if (auth) {
      const res = await api.bookings.all();
      const ids = fetchBookingListingIds(res.data.data.bookings);
      const bookings = await filterBookings(ids);
      setBookings(bookings);
      const listings = await fetchListings(ids);
      console.log('res', listings)
      setListings(listings);
    } else {
      const listings = await fetchListings([]);
      setListings(listings);
    }
  }, [location.key]);

  const fetchBookingListingIds = (allBookings) => {
    const userBookings = allBookings.filter(
      (booking) => booking.owner === localStorage.getItem('email')
    );
    const bookingListingIds = userBookings.map((booking) =>
      parseInt(booking.listingId, 10)
    );
    // A listing with multiple bookings should only be displayed once
    return [...new Set(bookingListingIds)];
  };

  const filterBookings = async (bookingListingIds) => {
    const bookingListings = [];
    for (const id of bookingListingIds) {
      const res = await api.listings.data(id);
      if (res.data.data.listing.published === true) {
        res.data.data.listing.id = id;
        bookingListings.push(res.data.data.listing);
      }
    }
    return bookingListings;
  };

  const fetchListings = async (bookingListingIds) => {
    const res = await api.listings.all();
    if (res.error) {
      console.error(res.error.data.error);
      return [];
    } else {
      return filterListings(res.data.data.listings, bookingListingIds);
    }
  };

  const filterListings = async (listings, bookingListingIds) => {
    const publishedListings = [];
    for (const listing of listings) {
      const res = await api.listings.data(listing.id);
      // Only display published listings and ignore the
      // listings that are booked by the current user
      if (res.data.data.listing.published && !bookingListingIds.includes(listing.id)) {
        res.data.data.listing.id = listing.id;
        publishedListings.push(res.data.data.listing);
      }
    }
    // All remaining listings should be displayed in alphabetical order of title.
    publishedListings.sort((a, b) => a.title.localeCompare(b.title));
    setPublishedListings(publishedListings);
    return publishedListings;
  };

  // UseEffect for setting the new filtered list
  useEffect(() => {
    setListings(filteredListings);
  }, [filteredListings]);

  useEffect(() => {
    setSearchType(searchType);
  }, [searchType]);

  const isString = () => {
    if (searchType === 'string') {
      return true;
    } else {
      return false;
    }
  };
  const isPrice = () => {
    if (searchType === 'price') {
      return true;
    } else {
      return false;
    }
  };
  const isBedroom = () => {
    if (searchType === 'bedrooms') {
      return true;
    } else {
      return false;
    }
  };
  const isDefault = () => {
    if (searchType === 'default') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <PageContainer>
      <Header>Search for a listing</Header>
      <Wrapper>
        <FormControl fullWidth>
          <Select defaultValue={'default'} onChange={(e) => setSearchType(e.target.value)}>
            <MenuItem value='default'>Please select a search option</MenuItem>
            <MenuItem value='string'>
              Search for a title, property type or location
            </MenuItem>
            <MenuItem value='price'>Search via price</MenuItem>
            <MenuItem value='bedrooms'>Search via number of bedrooms</MenuItem>
          </Select>
        </FormControl>

        {isDefault() && <></>}
        {isString() && (
          <SearchString
            publishedListings={publishedListings}
            setFilteredListings={setFilteredListings}
          />
        )}
        {isBedroom() && (
          <SearchNumMinMax
            labelMin={'Minimum number of bedrooms'}
            labelMax={'Maximum number of bedrooms'}
            publishedListings={publishedListings}
            setFilteredListings={setFilteredListings}
            type={'bedrooms'}
          />
        )}
        {isPrice() && (
          <SearchNumMinMax
            labelMin={'Minimum price per night'}
            labelMax={'Maximum price per night'}
            publishedListings={publishedListings}
            setFilteredListings={setFilteredListings}
            type={'price'}
          />
        )}
      </Wrapper>
      <Header>...</Header>
      {auth && bookings.length > 0 && (
        <>
          <Header>Bookings</Header>
          <ListingContainer>
            {bookings.map((booking, idx) => {
              return (
                <CardListing
                  key={idx}
                  listing={booking}
                  listingId={parseInt(booking.id, 10)}
                />
              );
            })}
          </ListingContainer>
        </>
      )}
      <Header>Browse Stays</Header>
      <ListingContainer>
        {listings.length === 0 && (
          <SubHeader>There are currently no published listings</SubHeader>
        )}
        {listings.map((listing, idx) => {
          return (
            <CardListing
              key={idx}
              listing={listing}
              listingId={parseInt(listing.id, 10)}
            />
          );
        })}
      </ListingContainer>
    </PageContainer>
  );
};

export default Home;

Home.propTypes = {
  auth: PropTypes.bool,
};

const PageContainer = styled.div`
  width: 90vw;
  max-width: 1000px;
  margin: 7vh auto;
`;

const Header = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 20pt;
`;

const SubHeader = styled.h3`
  text-align: center;
  font-weight: 500;
  font-size: 15pt;
`;

const ListingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;
// const SearchBarContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`
