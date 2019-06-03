import React from 'react'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { H1, H2 } from '../components/base'

export default () => {
  if (!UserService.isLoggedIn) {
    return <Redirect to="/login" />
  }
  return (
      <div className="FourOhFour">
        <H1>I think you might be lost...</H1>
        <H2>The page you are looking for cant be found</H2>
      </div>
  );
}