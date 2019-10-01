import { animation } from '../../utils/css'
import styled from 'styled-components'
import Panel from './Panel'

export default styled.div`
  background: ${props => props.theme.colors.background[props.colorful ? 'colorful' : props.dark ? 'dark' : 'light']};
  position: absolute;
  padding: ${props => props.theme.step * 4}px ${props => props.theme.step * 8}px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.centerContent ? 'center' : 'flex-start'};
  justify-content: ${props => props.centerContent ? 'center' : 'left'};;
  text-align: ${props => props.centerContent ? 'center' : 'left'};;
  min-height: min-content;

  &.fade-enter.fade-enter-active {
    ${animation('fadein-outer')}
    ${Panel} {
      ${animation('fadein-inner')}
    }
  }

  &.fade-exit.fade-exit-active {
    ${animation('fadeout-outer')}
    ${Panel} {
      ${animation('fadeout-inner')}
    }
  }

  &.fade-exit-done.fade-exit-done {
    display: none;
  }
`
