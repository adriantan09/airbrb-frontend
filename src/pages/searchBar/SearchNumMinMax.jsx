import { React, useState } from 'react'
// import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  TextField,
  Button
} from '@mui/material';

const SearchMinMax = ({ labelMin, labelMax, publishedListings, setFilteredListings, type }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const onChangeMin = (e) => {
    setMin(e.target.value);
  }
  const onChangeMax = (e) => {
    setMax(e.target.value);
  }
  const notEmpty = () => {
    if (min !== 0 && max !== 0) {
      return true;
    } else {
      return false;
    }
  }
  const clickedSearch = () => {
    fetchSearch();
  }
  // receives the search query from search bar in SearchString
  const fetchSearch = () => {
    setFilteredListings(publishedListings.filter(listing => Object.keys(listing).some(key => fetchFilter(listing, key))));
  }
  // fetchSearch filter
  const fetchFilter = (listing, key) => {
    if (type === 'bedrooms') {
      if (listing[key].numOfBedrooms <= max && listing[key].numOfBedrooms >= min) {
        return listing;
      }
    } else if (type === 'price') {
      if (key === 'price') {
        if (listing[key] <= max && listing[key] >= min) {
          return listing;
        }
      }
    }
  }
  return (
    <>
      <TextField
        label={labelMin}
        fullWidth
        type="number"
        onChange={onChangeMin}
      />
      <TextField
         label={labelMax}
         fullWidth
         type="number"
         onChange={onChangeMax}
      />
      <Button onClick={clickedSearch} disabled={!notEmpty()}>SEARCH</Button>
    </>
  );
}

export default SearchMinMax;

SearchMinMax.propTypes = {
  labelMin: PropTypes.string,
  labelMax: PropTypes.string,
  publishedListings: PropTypes.array,
  setFilteredListings: PropTypes.func,
  type: PropTypes.string
}
