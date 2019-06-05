import React, { Component } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Background = styled.div`
  min-height: 100vh;
  height: 100vh;
  font-size: 18px;
`

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
`

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {allowTransitions: false}
  }

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
    return (
      <Route render={({ location }) => (
        <Background>
          <Content>
            <CSSTransition
              key={this.locationKey(location)}
              classNames="fade"
              timeout={this.state.allowTransitions ? 1000 : 0}
              unmountOnExit
            >
              <Switch location={location}>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route component={NotFound} />
              </Switch>
            </CSSTransition>
          </Content>
        </Background>
      )} />
    )
  }
}

export default App
