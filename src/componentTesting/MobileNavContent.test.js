import { shallow } from 'enzyme';
import * as React from 'react';

import MobileNavContent from '../components/NavBar/MobileNavContent'

describe('MobileNavContent Tests', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <MobileNavContent
        isAuthenticated={false}
        handleLogout={jest.fn()}
      />
    )
  })

  it('checks signin link not authenticated', () => {
    const signinLink = wrapper.find('#link-signin').prop('to')
    expect(signinLink).toBe('/signin')
  })

  it('checks singup link when not authenticated', () => {
    const signupLink = wrapper.find('#link-signup').prop('to')
    expect(signupLink).toBe('/signup')
  })

  it('checks hosted listings link when authenticated', () => {
    wrapper = shallow(
      <MobileNavContent isAuthenticated={true} />
    )
    const hostedLink = wrapper.find('#link-hostedlistings').prop('to')
    expect(hostedLink).toBe('/hosted-listings')
  })

  it('checks handleLogout clickEvent when authenticated', () => {
    const mockFn = jest.fn()
    const signout = shallow(
      <MobileNavContent isAuthenticated={true} handleLogout={mockFn}/>
    )
    signout.find('#signout').simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })

  it('checks signin text', () => {
    const signinLink = wrapper.find('#link-signin').text()
    expect(signinLink).toBe('Sign In')
  })

  it('checks signup text', () => {
    const signupLink = wrapper.find('#link-signup').text()
    expect(signupLink).toBe('Sign Up')
  })
})
