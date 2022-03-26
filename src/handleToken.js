import { useState } from 'react';

export const handleToken = () => {
  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  };

  const authenticated = (token) => {
    if (token) return true
    return false
  }

  return { setToken: saveToken, authenticated: authenticated(token) }
}

export const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}
