import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @keyframes fadeout-outer {
    0%  {opacity: 1;}
    50%  {opacity: 1;}
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
