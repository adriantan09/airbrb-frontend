import { React, useEffect, useState } from 'react'
// import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  TextField,
  Button
} from '@mui/material';

const SearchString = ({ publishedListings, setFilteredListings }) => {
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  }
  useEffect(() => {
    setText(text);
  }, [text]);

  const clickedSearch = () => {
    fetchSearch(text);
  }

  // receives the search query from search bar in SearchString
  const fetchSearch = (text) => {
    setFilteredListings(publishedListings.filter(listing => Object.keys(listing).some(key => fetchFilter(listing, key, text))));
  }

  // fetchSearch filter
  const fetchFilter = (listing, key, query) => {
    // query is empty string
    if (query === '') {
      return listing
    } else if (typeof listing[key] === 'object') { // If the value is an object
      for (const attrb in listing[key]) {
        // If the value is a string
        if (typeof listing[key][attrb] === 'string') {
          if (listing[key][attrb].toLowerCase().includes(query.toLowerCase())) {
            return listing;
          }
        }
      }
    } else if (typeof listing[key] === 'string') {
      if (listing[key].toLowerCase().includes(query.toLowerCase())) {
        return listing;
      }
    }
  }

  return (
    <>
      <TextField
        label="Search for a title, location"
        fullWidth
        onChange={onChange}
      />
      <Button onClick={clickedSearch}>SEARCH</Button>
    </>
  );
}

export default SearchString;

SearchString.propTypes = {
  publishedListings: PropTypes.array,
  setFilteredListings: PropTypes.func
}
