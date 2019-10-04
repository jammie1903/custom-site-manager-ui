import React, {Component} from 'react'
import { H1, H2, Link, Button, Section, Background, BuildStatusTag } from '../base'
import Loading from '../../icons/Loading'
import Modal from '../Modal'
import ValidatedForm from '../ValidatedForm'
import ProjectService from '../../services/ProjectService';

export default class Projects extends Component {
  state = {projects: null, failed: false}

  componentDidMount() {
    ProjectService.subscribe('all', this.setProjects)
  }

  setProjects = projects => {
    this.setState({projects, failed: !projects})
  }

  onProjectCreated = () => {
    this.closeNewProjectModal()
    ProjectService.refresh()
  }

  openNewProjectModal = () => {
    this.setState({newProjectModalOpen: true})
  }

  closeNewProjectModal = () => {
    this.setState({newProjectModalOpen: false})
  }

  render() {
    const {projects, failed, newProjectModalOpen} = this.state

    return (
      <Background>
        <Section>
          <H1>
            Projects
            <Button margined onClick={this.openNewProjectModal}>New</Button>
            </H1>
          {failed ? (
            <div>
              <H2>Projects could not be loaded at this time</H2>
            </div>
          ) : projects && !projects.length ? (
            <div>
              <H2>You dont have any projects yet.</H2>
            </div>
          ) : projects ? (
            <ul>
              {projects.map(p => (
                <li key={p.id}>
                  <Link to={`/project/${p.id}`}>
                    <H2>
                      {p.projectName}
                      <BuildStatusTag status={p.build && p.build.status}></BuildStatusTag>
                    </H2>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <Loading />
            </div>
          )}
          <Modal open={newProjectModalOpen} size='l' title='New Project' h3 onClose={this.closeNewProjectModal}>
            <ValidatedForm
              method='POST'
              action={'project'}
              authenticationRequired={true}
              onSuccess={this.onProjectCreated}
              fields={[
                {name: 'projectName', displayName: 'Project Name', required: true},
                {name: 'siteName', displayName: 'Site Name', required: true}
              ]}>
            </ValidatedForm>
          </Modal>
        </Section>
      </Background>
    )
  }
}
