import React, {Component} from 'react'
import { Route, Switch} from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const getRoute = (path, routes) => {
  const segments = path.split('/')
  return routes.filter(r => {
    if(!r.path) return false
    const routeSegments = r.path.split('/')
    if((r.exact && routeSegments.length !== segments.length) || routeSegments.length > segments.length) {
      return false
    }

    for(let i = 0; i < routeSegments.length; i++) {
    if(!routeSegments[i].startsWith(':') && !(i === routeSegments.length - 1 && !routeSegments[i]) && routeSegments[i] !== segments[i]) return false
    }
    return true
  })[0] || {path}
  .path
}

export default class TransitionLayer extends Component {
  state = {allowTransitions: false}

  componentDidMount() {
    setTimeout(() => this.setState({allowTransitions: true}))
  }

  locationKey(location) {
    const key = getRoute(location.pathname, this.props.routes)
    if(!this.state.allowTransitions) {
      this.lastKey = key
      return null
    }
    if(this.lastKey === key) {
      return null
    }
    return key
  }
  
  render() {
    const {routes, classNames = 'fade', transitionGroupComponent = TransitionGroup} = this.props
    const Content = transitionGroupComponent
    return <Route render={({location}) => (
      <Content>
        <CSSTransition
          key={this.locationKey(location)}
          classNames={classNames}
          timeout={this.state.allowTransitions ? 800 : 0}
          unmountOnExit
        >
          <Switch location={location}>
            {routes.map(r => (
              <Route key={r.path || 'n/a'} path={r.path} exact={r.exact} component={r.component} />
            ))}
          </Switch>
        </CSSTransition>
      </Content>
    )} />
  }
}
