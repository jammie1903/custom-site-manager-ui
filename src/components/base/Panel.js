import styled, {css} from 'styled-components'

const xl = props => css`
  padding: ${props => props.theme.step * 4}px;
  margin: ${props => props.theme.step * 4}px;
  width: ${props => props.theme.breakpoints.xl - props.theme.step * 8}px;
`

const l = props => css`
  padding: ${props => props.theme.step * 4}px;
  margin: ${props => props.theme.step * 4}px;
  width: ${props => props.theme.breakpoints.l - props.theme.step * 8}px;
`

const m = props => css`
  padding: ${props => props.theme.step * 3}px;
  margin: ${props => props.theme.step * 3}px;
  width: ${props => props.theme.breakpoints.m - props.theme.step * 6}px;
`

const s = props => css`
  padding: ${props => props.theme.step * 2}px;
  margin: ${props => props.theme.step * 2}px;
  width: ${props => props.theme.breakpoints.s - props.theme.step * 4}px;
`

const xs = props => css`
  padding: ${props => props.theme.step * 2}px;
  margin: ${props => props.theme.step * 2}px;
  width: calc(100% - ${props => props.theme.step * 4}px);
`

const breakpointCss = [xl, l, m, s, xs]
const breakpoints = ['xl', 'l', 'm', 's', 'xs']

const breakpoint = (bp) => props => {
  let index = breakpoints.indexOf(bp)
  if(index === -1) index = 0
  let sizeIndex = breakpoints.indexOf(props.size)
  if(sizeIndex === -1) sizeIndex = 0

  if(index > sizeIndex) {
    return css`
      @media only screen and (max-width: ${props => props.theme.breakpoints[breakpoints[index - 1]]}px) {
        ${breakpointCss[index](props)}
      }
    `
  }

  if(index === sizeIndex) {
    return breakpointCss[index]
  }

  return ''
}

export default styled.div`
  text-align: left;
  background: ${props => props.theme.colors.background.light};
  border: 2px solid ${props => props.theme.colors.border.dark};
  border-radius: ${props => props.theme.step}px;
  color: ${props => props.theme.colors.text.dark};

  ${breakpoint('xl')}
  ${breakpoint('l')}
  ${breakpoint('m')}
  ${breakpoint('s')}
  ${breakpoint('xs')}
`
