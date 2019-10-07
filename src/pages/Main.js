import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { UI } from '../components/Layout'
import {Projects, Project} from '../components/Projects'
import styled from 'styled-components'
import NotFound from './NotFound'
import {Pages} from '../components/Pages'
import TransitionLayer from '../components/base/TransitionLayer'

const Content = styled(TransitionGroup)`
  height: 100%;
  min-height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
`

const routes = [
  {path:'/', exact: true, component: Projects},
  {path:'/project/:projectId', exact: true, component: Project},
  {path:'/project/:projectId/pages/:pageId?', component: Pages},
  {component: NotFound}
]

export default ({history}) => {
  if (!UserService.isLoggedIn && history.location.pathname !== '/login') {
    return <Redirect to="/login" />
  }
  return (
    <UI>
      <TransitionLayer transitionGroupComponent={Content} routes={routes}></TransitionLayer>
    </UI>
  )
}
