import React, {useState, useEffect} from 'react'
import { Background, Section } from '../base'
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
      <h1>{project.projectName}</h1>
      <a href={project.url} target='_blank' rel="noopener noreferrer">{project.siteName}</a>
    </Section>
  </Background>
}
