import { shallow } from 'enzyme';
import * as React from 'react';

import RatingItem from '../components/RatingItem'

describe('RatingItem Tests', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <RatingItem
        starType={1}
        setStarType={() => {}}
        totalReviews={10}
        numReviews={5}
      />
    )
  })

  it('triggers an onClick event when clicked', () => {
    const onClick = jest.fn();
    shallow(
      <RatingItem
        starType={1}
        setStarType={onClick}
        totalReviews={10}
        numReviews={5}
      />
    ).simulate('click')
    expect(onClick).toBeCalledWith(expect.any(Number))
  })

  it('should render three top level children after setting', () => {
    expect(wrapper.children().length).toBe(3)
  })

  it('checks the starType prop', () => {
    const starType = wrapper.find('#rating-star').text()
    expect(starType).toBe('1 Star')
  })

  it('checks the percentage calculation', () => {
    const progressValue = wrapper.find('#rating-progress').prop('value')
    expect(progressValue).toBe(50)
  })

  it('checks the progress prop', () => {
    const progressProp = wrapper.find('#rating-progress').prop('variant')
    expect(progressProp).toBe('determinate')
  })

  it('checks the percentage contents', () => {
    const percentage = wrapper.find('#rating-percent').text()
    expect(percentage).toBe('5 (50%)')
  })
})
