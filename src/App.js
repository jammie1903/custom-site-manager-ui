import React from 'react'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Main from './pages/Main'
import TransitionLayer from './components/base/TransitionLayer'

const Content = styled(TransitionGroup)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  min-height: 100%;
  width: 100%;
  overflow: auto;
`;

const routes = [
  { path: '/login', component: Login },
  { path: '/create-account', component: CreateAccount},
  { path: '/', component: Main }
];

export default () => <TransitionLayer transitionGroupComponent={Content} routes={routes}></TransitionLayer>
