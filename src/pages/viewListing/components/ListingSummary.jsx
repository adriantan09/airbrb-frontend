import { React } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReviewRating from '../../../components/ReviewRating'

import { Paper } from '@mui/material'

const ListingSummary = ({ listing, setStarType, isDateSearch }) => {
  const {
    title = '',
    price = 0,
    reviews = [],
    address: { number, street, city, state } = '',
    metadata: { bedrooms, beds, bathrooms } = 0,
    metadata: { type } = '',
  } = listing

  // const calcNumBeds = (propertyBedRooms) => {
  //   let beds = 0
  //   propertyBedRooms.forEach(bedroom => {
  //     beds += Object.values(bedroom).reduce((a, b) => a + b)
  //   })
  //   return beds
  // }

  return (
    <PropertyCard elevation={3}>
      <Container>
        <PropertyTitles>
          <Header>{title}&nbsp;</Header>
          <SubHeader>• {type}</SubHeader>
        </PropertyTitles>
        <ReviewRating reviews={reviews} setStarType={setStarType} />
        <SubHeader>
          {number} {street}, {city}, {state}
        </SubHeader>
        <SubHeader>
          {bedrooms}
          { (bedrooms === 1)
            ? <> bedroom • </>
            : <> bedrooms • </>
          }
          {beds}
          { (beds === 1)
            ? <> bed • </>
            : <> beds • </>
          }
          {bathrooms}
          { (bathrooms === 1)
            ? <> bathroom</>
            : <> bathrooms</>
          }
        </SubHeader>
        { (isDateSearch)
          ? <SubHeader>Price per stay: ${'calcPricePerStay(price)'}</SubHeader>
          : <SubHeader>Price per night: ${price}</SubHeader>
        }
      </Container>
    </PropertyCard>
  )
}

export default ListingSummary

ListingSummary.propTypes = {
  listing: PropTypes.object,
  setStarType: PropTypes.func,
  isDateSearch: PropTypes.bool,
}

const Container = styled.div`
  min-width: 300px;
`

const PropertyTitles = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 10px;
`

const PropertyCard = styled(Paper)`
  && {
    padding: 20px;
    max-width: 400px;
    margin: 30px auto;
  }
`

const Header = styled.h2`
  font-weight: 500;
  font-size: 16pt;
  margin: 10px 0;
`

const SubHeader = styled.h3`
  font-weight: 400;
  font-size: 13pt;
`
