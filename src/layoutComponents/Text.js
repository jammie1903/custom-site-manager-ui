import React, {useState} from 'react'
import styled from 'styled-components'
import EditingContext from './EditingContext'

const EditorInput = styled.input`
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
  const [updated, setUpdated] = useState(0)

  const onPropertyUpdated = (field, value) => {
    data.properties[field] = value
    setUpdated(updated+1)
  }

  return <EditingContext.Consumer>
    {({editing}) => editing ? <Editor onPropertyUpdated={onPropertyUpdated} {...data.properties}/> : <p>{data.properties.text}</p>}
  </EditingContext.Consumer>
}
