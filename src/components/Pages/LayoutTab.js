import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ProjectService from '../../services/ProjectService'
import { PageLayout } from '../PageLayout'
import EvaluatorService from '../../services/EvaluatorService'

const Container = styled.div`
  width: 100%;
`
const MenuBar = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background.light};
  padding: ${props => props.theme.step * 2}px ${props => props.theme.step * 8}px;
  border-bottom: 1px solid ${props => props.theme.colors.border.mid};
`

export default ({pageId}) => {
  const [pageData, setPageData] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)
  const fields = !pageData ? EvaluatorService.placeholder : EvaluatorService.evaluate(pageData.fields)
  
  useEffect(() => {
    ProjectService.getPageData(pageId)
      .then(setPageData)
  }, [pageId])

  return <Container>
    <MenuBar>
      <label>
        <input type='checkbox' checked={previewMode} onChange={e => setPreviewMode(e.target.checked)} />
        Preview Mode
      </label>
    </MenuBar>
    {pageData && pageData.layout && <PageLayout previewMode={previewMode} layout={pageData.layout} fields={fields} />}
  </Container>
}
