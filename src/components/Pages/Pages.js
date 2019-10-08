import React, {useState, useEffect} from 'react'
import { Background } from '../base'
import ProjectService from '../../services/ProjectService'
import styled from 'styled-components'
import PageTree from './PageTree'
import Page from './Page';

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
    Promise.all([ProjectService.get(projectId), ProjectService.getPages(projectId)])
    .then(([x, y]) => {
      setProject(x);
      setPages(y)
    })
  }, [projectId]);

  return <Background unpadded>
    <Wrapper>
      <PageTree pages={pages} projectId={projectId}/>
      {!!pageId && <Page pageId={pageId}/>}
    </Wrapper>
  </Background>
}