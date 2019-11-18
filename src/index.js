import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from 'styled-components'
import {createBrowserHistory} from 'history'
import theme from './theme'
import GlobalStyles from './globalStyles'

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
