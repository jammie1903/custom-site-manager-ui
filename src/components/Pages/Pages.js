import React, {useState, useEffect} from 'react'
import { Background, Section } from '../base'
import ProjectService from '../../services/ProjectService'
import styled from 'styled-components'
import PageTree from './PageTree'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export default ({match}) => {
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


  // if(!project) return <Background unpadded>
  //   <Section>
  //   </Section>
  // </Background>

  return <Background unpadded>
    <Wrapper>
      <PageTree pages={pages} projectId={projectId}/>
      <Section>
        {pageId}
      </Section>
    </Wrapper>
  </Background>
}