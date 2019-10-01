import React from 'react'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { UI } from '../components/Layout'
import Projects from '../components/Projects'

export default ({history}) => {
  if (!UserService.isLoggedIn && history.location.pathname !== '/login') {
    return <Redirect to="/login" />
  }
  return (
      <UI>
        <Projects />
      </UI>
  );
}

