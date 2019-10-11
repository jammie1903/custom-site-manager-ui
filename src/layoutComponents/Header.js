import React, {useState} from 'react'
import EditingContext from './EditingContext'
import styled from 'styled-components'
import { Header } from '../components/base'

const EditorInput = styled.input`
  display: block;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  text-decoration: inherit;
  background: transparent;
  border: 1px solid transparent;
  transition: border ${props => props.theme.animationLengths.short}ms;

  &:hover {
    border: 1px solid ${props => props.theme.colors.border.mid};
  }
`

const Editor = ({text, onPropertyUpdated}) => {
  return <EditorInput value={text} onChange={e => onPropertyUpdated('text', e.target.value)}/>
}

export default ({data}) => {
  const [updated, setUpdated] = useState(0)

  const onPropertyUpdated = (field, value) => {
    data.properties[field] = value
    setUpdated(updated+1)
  }

  return <EditingContext.Consumer>
    {editMode => (
      <Header type={data.properties.type}>
        {editMode ? <Editor onPropertyUpdated={onPropertyUpdated} {...data.properties}/> : data.properties.text}
      </Header>
    )}
  </EditingContext.Consumer>
}