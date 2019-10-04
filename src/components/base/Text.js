import styled from 'styled-components'

export default styled.span`
   color: ${({theme, error, light}) => error ? theme.colors.status.error : theme.colors.text[light ? 'light' : 'dark']};
`
