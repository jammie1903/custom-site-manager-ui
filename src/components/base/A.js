import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { lighten } from 'polished'

const style = props => css`
  color: ${props => props.theme.colors.text[props.light ? 'focusLight' : 'focusDark']};

  :hover {
    color: ${props => lighten(0.1, props.theme.colors.text[props.light ? 'focusLight' : 'focusDark'])};
  }
`

export const A = styled.a`${style}`

export const Link = styled(RouterLink)`${style}`