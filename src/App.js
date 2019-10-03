import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const Background = styled.div`
  min-height: 100vh;
  height: 100vh;
  font-size: 18px;
`;

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

const highLevelRoutes = [
  { path: "/login", component: Login },
  { path: "/create-account", component: CreateAccount }
];

const highLevelRoutePaths = highLevelRoutes.map(r => r.path);
console.log(highLevelRoutePaths);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { allowTransitions: false };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ allowTransitions: true }));
  }

  locationKey(location) {
    const key =
      highLevelRoutePaths.indexOf(location.pathname) !== -1
        ? location.key
        : "app";
    console.log(location, key);

    if (!this.state.allowTransitions) {
      this.lastKey = key;
      return null;
    }
    if (this.lastKey === key) {
      return null;
    }
    return key;
  }

  render() {
    return (
      <Route render={({ location }) => (
          // <Background>
            <Content>
              <CSSTransition
                key={this.locationKey(location)}
                classNames="fade"
                timeout={this.state.allowTransitions ? 800 : 0}
                unmountOnExit
              >
                <Switch location={location}>
                  {highLevelRoutes.map(r => (
                    <Route key={r.path} path={r.path} component={r.component} />
                  ))}
                  <Route path="/" component={Home} />
                </Switch>
              </CSSTransition>
            </Content>
          // </Background>
        )}
      />
    );
  }
}

export default App;
