import React from 'react'
import EditingContext from './EditingContext'
import styled from 'styled-components'
import { Header } from '../components/base'
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
  return <EditorInput value={text} onChange={e => onPropertyUpdated('text', e.target.value)}/>
}

export default ({data}) => {
  const onUpdate = onPropertyUpdated(data)

  return <EditingContext.Consumer>
    {({editing, fields}) => (
      <Header type={data.properties.type}>
        {editing ? <Editor onPropertyUpdated={onUpdate} {...data.properties}/> : fields(data.properties.text)}
      </Header>
    )}
  </EditingContext.Consumer>
}
