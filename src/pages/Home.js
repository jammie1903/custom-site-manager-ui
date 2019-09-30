import React from 'react'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { H1, H2 } from '../components/base'
import { UI } from '../components/Layout';

export default ({history}) => {
  if (!UserService.isLoggedIn && history.location.pathname !== '/login') {
    return <Redirect to="/login" />
  }
  return (
      <UI>
        <H1>Home</H1>
        <H2>Stuff will appear here</H2>
      </UI>
  );
}

