import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ProjectService from '../../services/ProjectService'
import { PageLayout } from '../PageLayout'

const Container = styled.div`
  width: 100%;
`
const MenuBar = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background.light};
  padding: ${props => props.theme.step * 2}px ${props => props.theme.step * 8}px;
`

export default ({pageId}) => {
  const [pageData, setPageData] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)
  
  useEffect(() => {
    ProjectService.getPageData(pageId)
    .then(setPageData)
  }, [pageId]);

  return <Container>
    <MenuBar>
      <input type='checkbox' checked={previewMode} onChange={e => setPreviewMode(e.target.checked)} />
    </MenuBar>
    {pageData && pageData.layout && <PageLayout previewMode={previewMode} layout={pageData.layout} />}
  </Container>
}
