import React from 'react'
import styled, {css} from 'styled-components'
import { darken } from 'polished'
import { Link as RouterLink } from 'react-router-dom'
import Loading from '../../icons/Loading'


const style = css`
  background: ${props => props.theme.colors.tertiary};
  border: 1px solid ${props => props.theme.colors.border.dark};
  font-size: 18px;
  padding: ${props => props.theme.step * 2}px ${props => props.theme.step * 4}px;
  color: ${props => props.theme.colors.text.light};
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-weight: 400;
  line-height: 1.2;
  vertical-align: text-bottom;
  margin: 0 ${props => props.margined ? props.theme.step * 4 : 0}px;

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

const Button = styled.button`${style}`
export const CtaButton = styled(RouterLink)`${style}`

export default (props) => {
  const p =  props.loading ? {...props, children: <Loading />} : props
  return props.cta ? <CtaButton {...p} /> : <Button {...p} />
}
