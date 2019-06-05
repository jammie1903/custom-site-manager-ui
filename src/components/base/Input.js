import styled from 'styled-components'

export default styled.input`
  width: 100%;
  border: solid ${props => props.theme.colors.border.dark};
  border-width: 0 0 1px 0;
  padding: 8px;
  transition: border-color ${props => props.theme.animationLengths.short}ms;
  background: transparent;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`
