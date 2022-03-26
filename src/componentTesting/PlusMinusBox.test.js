import { shallow } from 'enzyme';
import * as React from 'react';

import PlusMinusBox from '../pages/createListing/components/PlusMinusBox'

describe('PlusMinusBox Tests', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <PlusMinusBox
        label={'bedrooms'}
        state={0}
        setState={jest.fn()}
        addToState={jest.fn()}
        removeFromState={jest.fn()}
      />
    )
  })

  it('Checks for a state change in the number field entry', () => {
    const mockFn = jest.fn()
    const mockEvent = {
      preventDefault () {},
      target: { value: 'Mockvalue' }
    };
    wrapper = shallow(
      <PlusMinusBox
        label={'customId'}
        state={0}
        setState={mockFn}
      />
    )
    wrapper.find('#customId').simulate('change', mockEvent)
    expect(mockFn).toHaveBeenCalled()
  })

  it('Checks that the decrement handles onChange', () => {
    const mockFn = jest.fn()
    const wrap = shallow(<PlusMinusBox removeFromState={mockFn} />)
    wrap.find('#decrement').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })

  it('Checks that the increment handles onChange', () => {
    const mockFn = jest.fn()
    const wrap = shallow(<PlusMinusBox addToState={mockFn} />)
    wrap.find('#increment').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })

  it('Checks that label prop has been rendered correctly', () => {
    const buttonLabel = wrapper.find('#button-label').text()
    expect(buttonLabel).toBe('bedrooms')
  })

  it('Checks that the increment button has an aria label', () => {
    const increment = wrapper.find('#increment').prop('aria-label')
    expect(increment).toBe('addBedroom')
  })

  it('Checks that the decrement button has an aria label', () => {
    const decrement = wrapper.find('#decrement').prop('aria-label')
    expect(decrement).toBe('removeBedroom')
  })
})
