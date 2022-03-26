import axios from 'axios';
import resolve from './resolve.js';
import { getToken } from '../handleToken.js';

const instance = axios.create({ baseURL: 'https://airbrb-backend.herokuapp.com/' })

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

/***************************************************************
     auth - Managing user authentication and authorisation
***************************************************************/

const auth = {}

/**
 * Send registration request for a new user to join AirBrB
 * @param {String} email
 * @param {String} password
 * @param {String} name
 */
auth.register = async (email, password, name) => {
  return await resolve(
    instance.post('/user/auth/register', { email, password, name })
  )
}

/**
 * Given correct user credentials, return an authorised access
 * token to make subsequent user calls
 * @param {String} email
 * @param {String} password
 */
auth.login = async (email, password) => {
  return await resolve(
    instance.post('/user/auth/login', { email, password })
  )
}

/**
 * Invalidate a particular authorised token
 */
auth.logout = async () => {
  return await resolve(
    instance.post('/user/auth/logout')
  )
}

/***************************************************************
                  listings - Managing listings
***************************************************************/

const listings = {}

/**
 * Get a list of the meta-data for all AirBrB listings
 */
listings.all = async () => {
  return await resolve(
    instance.get('/listings')
  )
}

/** TEST
 * Create a new AirBrB listing
 * @param {Object} data
 * i.e Property type, Number of bathrooms, Property bedrooms, Property amenities
 */
listings.create = async (data) => {
  return await resolve(
    instance.post('/listings/new', data)
  )
}

/**
 * Collect all of the data pertaining to a particular AirBrB listing
 * @param {Number} listingId
 */
listings.data = async (listingId) => {
  return await resolve(
    instance.get(`/listings/${listingId}`)
  )
}

/** TEST
 * Update the details of a particular AirBrB listing
 * @param {Object} data
 * @param {Number} listingId
 */
listings.update = async (data, listingId) => {
  return await resolve(
    instance.put(`/listings/${listingId}`, data)
  )
}

/**
 * Delete a particular AirBrB listing
 * @param {Number} listingId
 */
listings.delete = async (listingId) => {
  return await resolve(
    instance.delete(`/listings/${listingId}`)
  )
}

/**
 * Publish a particular AirBrB listing
 * @param {Number} listingId
 * @param {Object} availability
 */
listings.publish = async (listingId, availability) => {
  return await resolve(
    instance.put(`/listings/publish/${listingId}`, { availability })
  )
}

/**
 * Unpublish a particular AirBrB listing
 * @param {Number} listingId
 */
listings.unpublish = async (listingId) => {
  return await resolve(
    instance.put(`/listings/unpublish/${listingId}`)
  )
}

/**
 * Post a new listing review
 * @param {Number} listingId
 * @param {Number} bookingId
 * @param {Object} review
 */
listings.postReview = async (listingId, bookingId, review) => {
  return await resolve(
    instance.put(`/listings/${listingId}/review/${bookingId}`, { review })
  )
}

/***************************************************************
                  bookings - Managing bookings
***************************************************************/

const bookings = {}

/**
 * Get a list of the meta-data for all AirBrB bookings
 */
bookings.all = async () => {
  return await resolve(
    instance.get('/bookings')
  )
}

/**
 * Create a new AirBrB booking for a particular listing
 * @param {Number} listingId
 * @param {Object} dateRange
 * @param {Number} totalPrice
 */
bookings.create = async (listingId, dateRange, totalPrice) => {
  return await resolve(
    instance.post(`/bookings/new/${listingId}`, { dateRange, totalPrice })
  )
}

/**
 * Accept an AirBrB booking for your listing
 * @param {Number} bookingId
 */
bookings.accept = async (bookingId) => {
  return await resolve(
    instance.put(`/bookings/accept/${bookingId}`)
  )
}

/**
 * Decline an AirBrB booking for your listing
 * @param {Number} bookingId
 */
bookings.decline = async (bookingId) => {
  return await resolve(
    instance.put(`/bookings/decline/${bookingId}`)
  )
}

/** (Not mentioned in specification)
 * Delete a particular AirBnb booking
 * @param {Number} bookingId
 */
bookings.delete = async (bookingId) => {
  return await resolve(
    instance.delete(`/bookings/${bookingId}`)
  )
}

export default { auth, listings, bookings };
