import styled, {css} from 'styled-components'

const shared = ({light, theme}) => css`
  color: ${theme.colors.text[light ? 'light' : 'dark']};
  margin: 0 0 0.6667em;
`

export const H1 = styled.h1`
  ${shared}
`

export const H2 = styled.h2`
  ${shared}
`

export const H3 = styled.h3`
  ${shared}
`

export const H4 = styled.h4`
  ${shared}
`

export const H5 = styled.h5`
  ${shared}
`

export const H6 = styled.h6`
  ${shared}
`