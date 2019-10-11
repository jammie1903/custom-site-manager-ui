import React from 'react'
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

const getHeader = type => {
  switch(type) {
    case 'H6': return H6
    case 'H5': return H5
    case 'H4': return H4
    case 'H3': return H3
    case 'H2': return H2
    case 'H1': 
    default: return H1
  }
}

export const Header = props => {
  const HeaderElement = getHeader(props.type)
  return <HeaderElement {...props}/>
}
