import React, {useState, useEffect} from 'react'
import { Background } from '../base'
import ProjectService from '../../services/ProjectService'
import styled from 'styled-components'
import PageTree from './PageTree'
import Page from './Page';
import PageService from '../../services/PageService';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`

export default ({match, location}) => {
  const projectId = match.params.projectId
  const pageId = match.params.pageId
  const [project, setProject] = useState(null)

  const [pages, setPages] = useState(null)

  useEffect(() => {
    ProjectService.get(projectId)
      .then(setProject)

    PageService.subscribeToTree(projectId, setPages)

    return () => {
      PageService.unsubscribeToTree(projectId, setPages)
    }
  }, [projectId]);

  return <Background unpadded>
    <Wrapper>
      <PageTree pages={pages} projectId={projectId} pageId={pageId}/>
      {!!pageId && <Page pageId={pageId}/>}
    </Wrapper>
  </Background>
}
