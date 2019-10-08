import styled from 'styled-components'
import { animation } from '../../utils/css';
import Panel from './Panel';
export default styled.div`
  &.fade-enter.fade-enter-active {
    ${animation('fadein-outer')}
    ${Panel}, & {
      ${animation('fadein-inner')}
    }
  }

  &.fade-exit.fade-exit-active {
    pointer-events: none;
    ${animation('fadeout-outer')}
    ${Panel}, & {
      ${animation('fadeout-inner')}
    }
  }

  &.fade-exit-done.fade-exit-done {
    display: none;
  }`
