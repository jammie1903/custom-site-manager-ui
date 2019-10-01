import React from 'react'
import styled from 'styled-components'

const cross = ({className}) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="
      M0,10 L10,0 50,40 90,0 100,10 60,50 100,90 90,100 50,60 10,100 0,90 40,50
    "/>
  </svg>
)

export default styled(cross)`
  fill: ${({light, theme}) => theme.colors.text[light ? 'light' : 'dark']};
  width: 1em;
  line-height: 1em;
  position: relative;
  display: inline-block;
  stroke: currentColor;
`
