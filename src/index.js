import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

const theme = {
  colors : {
    primary: '#5b3444',
    secondary: '#9a5477',
    tertiary: '#f3b75d',
    background: {
      colorful: 'linear-gradient(to right top, #5b3444, #8b4b54, #b8685a, #dc8c5c, #f3b75d)',
      light: '#fffdfa',
      dark: '#4f4046'
    },
    text: {
      light: '#fffdfa',
      dark: '#4f4046',
      focusDark: '#9a5477',
      focusLight: '#f3b75d',
      error: '#ff0000'
    },
    border: {
      dark: '#4f4046',
      light: '#fffdfa'
    }
  },
  step: 4,
  animationLengths: {
    tiny: 200,
    short: 300,
    medium: 500,
    large: 1000
  },
  breakpoints: {
    s: 320,
    m: 480,
    l: 768,
    xl: 992,
    xxl: 1200,
  }
}

const GlobalStyle = createGlobalStyle`
    @keyframes fadeout-outer {
    0%  {opacity: 1;}
    50%  {opacity: 1;}
    /* 51%  {opacity: 0;} */
    /* 99%  {opacity: 1;} */
    100%  {opacity: 0;}
  }

  @keyframes fadeout-inner {
    0%   {opacity: 1;}
    50%  {opacity: 0;}
    100%  {opacity: 0;}
  }

  @keyframes fadein-outer {
    0%  {opacity: 0;}
    50%  {opacity: 0;}
    51%  {opacity: 1;}
    100%  {opacity: 1;}
  }

  @keyframes fadein-inner {
    0%   {opacity: 0;}
    50%  {opacity: 0;}
    100%  {opacity: 1;}
  }
`

ReactDOM.render(
  <Router history={history}>
    <GlobalStyle />
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
