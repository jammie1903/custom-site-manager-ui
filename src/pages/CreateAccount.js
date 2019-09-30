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

export default class CreateAccount extends Component{
  constructor(props) {
    super(props)
    this.state = {loggedIn: UserService.isLoggedIn}
  }

  onCreate = ({token}) => {
    UserService.token = token
    this.setState({loggedIn: UserService.isLoggedIn})
  }

  render() {
    if (this.state.loggedIn && this.props.history.location.pathname === '/create-account') {
      return <Redirect to="/" />
    }

    return (
    <Background colorful>
      <Panel size='m'>
        <H3>Create an Account</H3>
        <ValidatedForm
          method='POST'
          action={'user'}
          authenticationRequired={false}
          onSuccess={this.onCreate}
          fields={[
            {name: 'firstName', displayName: 'First Name', required: true},
            {name: 'lastName', displayName: 'Last Name', required: true},
            {name: 'email', displayName: 'Email Address', type: 'email', required: true},
            {name: 'password', displayName: 'Password', type: 'password', required: true},
            {name: 'confirmPassword', displayName: 'Confirm Password', type: 'password', required: true,
              equalTo: 'password', transient: true, validationMessages: {
                valueMissing: 'Please confirm your password', 
                notEqual: 'The passwords do not match'
              }
            }
          ]}>
        </ValidatedForm>
        <LinkSection>Already have an account? <Link to="/login">login</Link></LinkSection>
      </Panel>
    </Background>
    )

  }
}
