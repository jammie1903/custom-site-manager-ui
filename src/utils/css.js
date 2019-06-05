import { css } from 'styled-components'

export const animation = (name, animationCount = 1, animationLength = 'large') => props => css`
  animation-name: ${name};
  animation-duration: ${props => props.theme.animationLengths[animationLength]}ms;
  animation-iteration-count: ${animationCount};
  animation-fill-mode: both;
`
