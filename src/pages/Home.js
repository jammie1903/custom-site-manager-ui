import React, {Component} from 'react'
import { Route, Switch} from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Redirect } from 'react-router-dom'
import UserService from '../services/UserService'
import { UI } from '../components/Layout'
import Projects from '../components/Projects'
import styled from 'styled-components'
import NotFound from './NotFound'
import { Section, Background } from '../components/base'

const Project = () => (
  <Background>
    <Section>
      <h1>PROJECT</h1>
    </Section>
  </Background>
)

const Content = styled(TransitionGroup)`
  height: 100%;
  min-height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
`

export default class Home extends Component {
  state = {allowTransitions: false}

  componentDidMount() {
    setTimeout(() => this.setState({allowTransitions: true}))
  }

  locationKey(location) {
    if(!this.state.allowTransitions) {
      this.lastKey = location.key
      return null
    }
    if(this.lastKey === location.key) {
      return null
    }
    return location.key
  }

  render() {
    const {history} = this.props
    if (!UserService.isLoggedIn && history.location.pathname !== '/login') {
      return <Redirect to="/login" />
    }
    return (
      <UI>
        <Route render={({ location }) => (
          <Content>
            <CSSTransition
              key={this.locationKey(location)}
              classNames="fade"
              timeout={this.state.allowTransitions ? 800 : 0}
              unmountOnExit
            >
              <Switch location={location}>
                <Route path='/' exact component={Projects}/>
                <Route path='/project/:projectId' component={Project}/>
                <Route component={NotFound} />
              </Switch>
            </CSSTransition>
          </Content>
        )} />
      </UI>
    )
  }
}

