import React, {Component} from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';
import {H3, Panel} from '../components/base'
import ValidatedForm from '../components/ValidatedForm'
import UserService from '../services/UserService'

const Background = styled.div`
  background: ${props=> props.theme.colors.background.colorful};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
    if (this.state.loggedIn) {
      return <Redirect to="/" />
    }

    return (
    <Background>
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
      </Panel>
    </Background>
    )

  }
}
