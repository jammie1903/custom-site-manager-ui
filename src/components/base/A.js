import styled from 'styled-components'
import { lighten } from 'polished'

export default styled.a`
  color: ${props => props.theme.colors.text[props.light ? 'focusLight' : 'focusDark']};

  :hover {
    color: ${props => lighten(0.1, props.theme.colors.text[props.light ? 'focusLight' : 'focusDark'])};
  }
`