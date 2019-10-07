import React from 'react'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { H1, H2, Background } from '../components/base'

export default () => {
  if (!UserService.isLoggedIn) {
    return <Redirect to="/login" />
  }
  return (
    <Background>
      <H1>I think you might be lost...</H1>
      <H2>The page you are looking for cant be found</H2>
    </Background>
  );
}