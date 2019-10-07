import React, {useState, useEffect} from 'react'
import { Background, Section, Link, A, H1 } from '../base'
import ProjectService from '../../services/ProjectService';

export default ({match}) => {
  const projectId = match.params.projectId
  const [project, setProject] = useState(null);

  useEffect(() => {
    ProjectService.subscribe(projectId, setProject)

    return () => {
      ProjectService.unsubscribe(projectId, setProject)
    };
  }, [projectId]);

  if(!project) return <Background>
    <Section>
    </Section>
  </Background>

  return <Background>
    <Section>
      <H1>{project.projectName}</H1>
      <A href={project.url} target='_blank' rel="noopener noreferrer">{project.siteName}</A>
      <br/>

      <Link to={`/project/${projectId}/pages`}>Pages</Link>
      <br/>
      <Link to={`/project/${projectId}/entites`}>Entites</Link>
    </Section>
  </Background>
}
