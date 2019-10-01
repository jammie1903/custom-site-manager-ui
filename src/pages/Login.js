import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { H3, Panel, Link, Background } from '../components/base'
import ValidatedForm from '../components/ValidatedForm'
import UserService from '../services/UserService'

const LinkSection = styled.span`
  margin-top: 8px;
  display: inline-block;
`

export default class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {loggedIn: UserService.isLoggedIn}
  }

  onLogin = ({token}) => {
    UserService.token = token
    this.setState({loggedIn: UserService.isLoggedIn})
  }

  render() {
    if (this.state.loggedIn && this.props.history.location.pathname === '/login') {
      return <Redirect to="/" />
    }

    return (
    <Background centerContent colorful>
      <Panel size='m'>
        <H3>Sign in to continue</H3>
        <ValidatedForm
          method='POST'
          action={'user/login'}
          authenticationRequired={false}
          onSuccess={this.onLogin}
          fields={[
            {name: 'email', displayName: 'Email Address', type: 'email', required: true},
            {name: 'password', displayName: 'Password', type: 'password', required: true}
          ]}>
        </ValidatedForm>
        <LinkSection>New here? <Link to="/create-account">create an account</Link></LinkSection>
      </Panel>
    </Background>
    )

  }
}
