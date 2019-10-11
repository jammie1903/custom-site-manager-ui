import React, {useState} from 'react'
import styled from 'styled-components'
import EditingContext from './EditingContext'
import {mapChildren} from './'

const Container = styled.div`
  width: 100%;
  padding: ${props => props.theme.step * 4}px ${props => props.theme.step * 8}px;
`

const Editor = ({childItems, onPropertyUpdated}) => {
  return <Container>{childItems}</Container>
}

export default ({data}) => {
  const children = mapChildren(data.properties.children)
  const [updated, setUpdated] = useState(0)

  const onPropertyUpdated = (field, value) => {
    data.properties[field] = value
    setUpdated(updated+1)
  }

  return <EditingContext.Consumer>
    {({editing}) => editing ? <Editor onPropertyUpdated={onPropertyUpdated} childItems={children}/> : <Container>{children}</Container>}
  </EditingContext.Consumer>
}
