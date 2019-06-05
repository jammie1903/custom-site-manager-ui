import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { H3, Panel, Link } from '../components/base'
import ValidatedForm from '../components/ValidatedForm'
import UserService from '../services/UserService'
import { animation } from '../utils/css'

const Background = styled.div`
  background: ${props=> props.theme.colors.background.colorful};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: min-content;

  &.fade-enter.fade-enter-active {
    ${animation('fadein-outer')}
    ${Panel} {
      ${animation('fadein-inner')}
    }
  }

  &.fade-exit.fade-exit-active {
    ${animation('fadeout-outer')}
    ${Panel} {
      ${animation('fadeout-inner')}
    }
  }

  &.fade-exit-done {
    display: none;
  }
`

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
    <Background>
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
