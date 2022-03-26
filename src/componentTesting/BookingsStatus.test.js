import { shallow } from 'enzyme';
import * as React from 'react';

import BookingStatus from '../pages/viewListing/components/BookingStatus';

describe('BookingStatus Tests', () => {
  const mockBooking = {
    severity: 'error',
    id: 1234,
    message: 'test message',
    dateRange: {
      startDate: '2021-12-13T01:00:00.000Z',
      endDate: '2021-12-19T01:00:00.000Z',
    }
  }

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BookingStatus booking={mockBooking}/>)
  })

  it('should render three top level sections (id, dates, status)', () => {
    expect(wrapper.children().length).toBe(3)
  })

  it('checks the severity prop', () => {
    expect(wrapper.prop('severity')).toBe('error')
  })

  it('checks the booking id is rendered correctly', () => {
    const bookingId = wrapper.find('#booking-id').text()
    expect(bookingId).toBe('1234')
  })

  it('checks the date was parsed correctly', () => {
    const bookingDates = wrapper.find('#booking-dates').text()
    expect(bookingDates).toBe('Mon 13 Dec - Sun 19 Dec')
  })

  it('checks the booking message is rendered correctly', () => {
    const bookingMsg = wrapper.find('#booking-msg').text()
    expect(bookingMsg).toBe('test message')
  })
})
