import { React } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ReviewRating from './ReviewRating'

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material'

const CardListing = ({ listing, listingId }) => {
  const { title, thumbnail, price, reviews } = listing

  return (
    <ListingLink to={`listing/${listingId}`}>
      <ListingCard>
        <CardActionArea>
          <CardMedia
            component="img"
            height="150"
            image={thumbnail.base64}
            alt={title}
          />
          <CardContent>
            <Title>{title}</Title>
            <Price>${price} AUD / night</Price>
            <ReviewRating reviews={reviews} disabled={true}/>
          </CardContent>
        </CardActionArea>
      </ListingCard>
    </ListingLink>
  )
}

export default CardListing

CardListing.propTypes = {
  listing: PropTypes.object,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  reviews: PropTypes.array,
  price: PropTypes.number,
  listingId: PropTypes.number,
}

const ListingLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  max-width: 320px;
`

const ListingCard = styled(Card)`
  width: 100%;
  max-width: 320px;
`

const Title = styled.h3`
  font-size: 16pt;
  margin: 5px 0;
`

const Price = styled.h4`
  font-size: 12pt;
  margin: 10px 0;
`
