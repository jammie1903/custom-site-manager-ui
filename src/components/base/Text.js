import styled from 'styled-components'

export default styled.span`
   color: ${({theme, error, light}) => theme.colors.text[error ? 'error' : light ? 'light' : 'dark']};
`
