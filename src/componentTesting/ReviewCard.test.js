import { shallow } from 'enzyme';
import * as React from 'react';

import ReviewCard from '../pages/viewListing/components/ReviewCard'

describe('ReviewCard Tests', () => {
  const mockReview = {
    username: 'testUsername',
    time: '18/11/2021',
    score: 3,
    comment: 'test review props',
  }

  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ReviewCard review={mockReview} />)
  })

  it('should render three top level children', () => {
    expect(wrapper.children().length).toBe(3)
  })

  it('checks the username prop', () => {
    const username = wrapper.find('#review-username').text()
    expect(username).toBe('testUsername')
  })

  it('checks the time prop', () => {
    const time = wrapper.find('#review-time').text()
    expect(time).toBe('18/11/2021')
  })

  it('checks the comment prop', () => {
    const comment = wrapper.find('#review-comment').text()
    expect(comment).toBe('test review props')
  })

  it('checks the rating prop', () => {
    const rating = wrapper.find('#review-rating').prop('value')
    expect(rating).toBe(3)
  })

  it('checks sure the rating is set to readonly', () => {
    const rating = wrapper.find('#review-rating').prop('readOnly')
    expect(rating).toBeTruthy()
  })
})
