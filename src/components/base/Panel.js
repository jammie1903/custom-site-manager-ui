import React from 'react'
import styled, {css} from 'styled-components'
import { H1, H2, H3 } from './Headers'

const Content = styled.div``
const HeaderContentWrapper = styled.div`
  float: right;
`

const xl = props => css`
  margin: ${props => props.theme.step * 4}px;
  width: ${props => props.theme.breakpoints.xl - props.theme.step * 8}px;
  ${Content} {
    padding: ${props => props.theme.step * 4}px;
  }

  > ${H1}:first-child, > ${H2}:first-child, > ${H3}:first-child {
    padding: ${props => props.theme.step * 4}px;
  }
`

const l = props => css`
  margin: ${props => props.theme.step * 4}px;
  width: ${props => props.theme.breakpoints.l - props.theme.step * 8}px;
  ${Content} {
    padding: ${props => props.theme.step * 4}px;
  }

  > ${H1}:first-child, > ${H2}:first-child, > ${H3}:first-child {
    padding: ${props => props.theme.step * 4}px;
  }
`

const m = props => css`
  margin: ${props => props.theme.step * 3}px;
  width: ${props => props.theme.breakpoints.m - props.theme.step * 6}px;
  ${Content} {
    padding: ${props => props.theme.step * 3}px;
  }

  > ${H1}:first-child, > ${H2}:first-child, > ${H3}:first-child {
    padding: ${props => props.theme.step * 3}px;
  }
`

const s = props => css`
  margin: ${props => props.theme.step * 2}px;
  width: ${props => props.theme.breakpoints.s - props.theme.step * 4}px;
  ${Content} {
    padding: ${props => props.theme.step * 2}px;
  }

  > ${H1}:first-child, > ${H2}:first-child, > ${H3}:first-child {
    padding: ${props => props.theme.step * 2}px;
  }
`

const xs = props => css`
  margin: ${props => props.theme.step * 2}px;
  width: calc(100% - ${props => props.theme.step * 4}px);
  ${Content} {
    padding: ${props => props.theme.step * 2}px;
  }

  > ${H1}:first-child, > ${H2}:first-child, > ${H3}:first-child {
    padding: ${props => props.theme.step * 2}px;
  }
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

const Panel = props => {
  let {title, headerContent, h1, h2, children} = props
  const HeaderType = h1 ? H1 : h2 ? H2 : H3
  headerContent = headerContent ? <HeaderContentWrapper>{headerContent}</HeaderContentWrapper> : ''
  return (
    <div className={props.className}>
      {(!!title || !!headerContent) && <HeaderType light>{title}{headerContent}</HeaderType>}
      <Content>{children}</Content>
    </div>
  )
}

export default styled(Panel)`
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

  > ${H1}:first-child, > ${H2}:first-child, > ${H3}:first-child {
    background: ${props => props.theme.colors.background.colorful};
  }
`