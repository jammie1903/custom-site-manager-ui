import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from 'styled-components'
import {createBrowserHistory} from 'history'
import theme from './theme';
import GlobalStyles from './globalStyles';

export const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
