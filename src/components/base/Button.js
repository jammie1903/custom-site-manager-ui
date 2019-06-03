import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import Loading from '../../icons/Loading'

const Button = styled.button`
  background: ${props => props.theme.colors.tertiary};
  border: 1px solid ${props => props.theme.colors.border.dark};
  font-size: 18px;
  padding: ${props => props.theme.step * 2}px ${props => props.theme.step * 4}px;
  color: ${props => props.theme.colors.text.light};
  cursor: pointer;

  :hover {
    background: ${props => darken(0.1, props.theme.colors.tertiary)};
  }

  :active {
    background: ${props => darken(0.15, props.theme.colors.tertiary)};
    outline: ${props => props.theme.colors.primary};
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }
`

export default (props) => {
  const p =  props.loading ? {...props, children: <Loading />} : props
  return <Button {...p} />
}