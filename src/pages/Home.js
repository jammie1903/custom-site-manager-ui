import React from 'react'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { H1, H2 } from '../components/base'

export default ({history}) => {
  if (!UserService.isLoggedIn && history.location.pathname !== '/login') {
    return <Redirect to="/login" />
  }
  return (
      <div className="FourOhFour">
        <H1>Home</H1>
        <H2>Stuff will appear here</H2>
      </div>
  );
}

