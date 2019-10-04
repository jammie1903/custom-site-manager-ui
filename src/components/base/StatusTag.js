import React from 'react'
import styled from 'styled-components'
export const StatusTag = styled.div`
  background-color: ${props => props.theme.colors.status[props.error ? 'error' : props.warning ? 'warning' : props.success ? 'success' : 'info']};
  color: ${props => props.theme.colors.text.light};
  font-weight: bold;
  text-transform: uppercase;
  display: inline-block;
  padding: 0 ${props => props.theme.step * 2}px;
  border-radius: ${props => props.theme.step}px;
  font-size: 0.7em;
  line-height: 1.4;
  margin: 0 ${props => props.theme.step * 2}px;
`

export const BuildStatusTag = ({status}) => {
  switch(status) {
    case 'failed': return <StatusTag error>release failed</StatusTag>
    case 'pending': return <StatusTag>releasing</StatusTag>
    default: return ''
  }
}