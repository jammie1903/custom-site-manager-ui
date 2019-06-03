import React from 'react'
import styled from 'styled-components'

const loading = ({className}) => (
  <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid">
    <circle id="circle" cx="50" cy="50" fill="none" strokeWidth="12" r="42" 
      strokeDasharray="197.92033717615698 67.97344572538566" transform="rotate(91.0851 50 50)">
      <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50"
        keyTimes="0;1" dur="0.7s" begin="0s" repeatCount="indefinite">
      </animateTransform>
    </circle>
  </svg>
)

export default styled(loading)`
  width: .9em;
  line-height: .9em;
  position: relative;
  display: inline-block;
  top: 2px;
  stroke: currentColor;
`
