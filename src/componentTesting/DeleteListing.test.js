import { shallow } from 'enzyme';
import * as React from 'react';

import DeleteListing from '../pages/hostedListings/components/DeleteListing'

describe('ReviewCard Tests', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <DeleteListing
        open={true}
        setOpen={jest.fn()}
        listingId={1234}
        setIsDeleted={jest.fn()}
      />
    )
  })

  it('checks the open prop', () => {
    expect(wrapper.prop('open')).toBeTruthy()
  })

  it('checks the dialog title', () => {
    const title = wrapper.find('#delete-title').text()
    expect(title).toBe('Delete Listing?')
  })

  it('checks the listingId prop', () => {
    const prompt = wrapper.find('#delete-prompt').text()
    expect(prompt).toBe(`Are you sure you would like to delete listing with ID: ${1234}`)
  })

  it('should render three top level children after prop insertion', () => {
    expect(wrapper.children().length).toBe(3)
  })

  it('checks the clickEvent for the cancel button', () => {
    const mockFn = jest.fn()
    const wrap = shallow(<DeleteListing setOpen={mockFn} />)
    wrap.find('#delete-cancel').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })

  it('checks the text of the cancel button', () => {
    const cancelBtn = wrapper.find('#delete-cancel').text()
    expect(cancelBtn).toBe('Cancel')
  })

  it('checks the text of the delete button', () => {
    const deleteBtn = wrapper.find('#delete-confirm').text()
    expect(deleteBtn).toBe('Delete')
  })
})
