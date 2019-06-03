import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Background = styled.div`
  min-height: 100vh;
  height: 100vh;
  font-size: 18px;
`
const Content = styled.div`
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

function App() {
  return (
    <Background>
      <Content>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Content>
    </Background>
  )
}

export default App
