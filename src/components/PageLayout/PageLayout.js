import React from 'react'
import styled from 'styled-components'
import EditingContext from '../../layoutComponents/EditingContext'
import { mapChildren } from '../../layoutComponents'

const Container = styled.div`
  width: 100%;
`

export default ({layout, previewMode}) => (
  <EditingContext.Provider value={!previewMode}>
    <Container>
      {mapChildren(layout)}
    </Container>
  </EditingContext.Provider>
)
