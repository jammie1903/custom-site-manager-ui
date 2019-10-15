import React from 'react'
import styled from 'styled-components'
import EditingContext from './EditingContext'
import TextareaAutosize from 'react-textarea-autosize'
import onPropertyUpdated from './onPropertyUpdated'

const EditorInput = styled(TextareaAutosize)`
  display: block;
  width: 100%;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  text-decoration: inherit;
  background: transparent;
  border: 1px solid transparent;
  resize: none;
  margin: -1px;
  padding: 0;
  transition: border ${props => props.theme.animationLengths.short}ms;

  &:hover {
    border: 1px solid ${props => props.theme.colors.border.mid};
  }
`

const Editor = ({text, onPropertyUpdated}) => {
  return <p>
    <EditorInput value={text} onChange={e => onPropertyUpdated('text', e.target.value)}/>
  </p>
}

export default ({data}) => {
  const onUpdate = onPropertyUpdated(data)

  return <EditingContext.Consumer>
    {({editing}) => editing ? <Editor onPropertyUpdated={onUpdate} {...data.properties}/> : <p>{data.properties.text}</p>}
  </EditingContext.Consumer>
}
