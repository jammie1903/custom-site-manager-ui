import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { Link, Button } from '../base'
import Modal from '../Modal';
import ValidatedForm from '../ValidatedForm';
import PageService from '../../services/PageService';

const PageTree = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.background.light};
  overflow: auto;
  border-right: 1px solid ${props => props.theme.colors.border.mid};
`

const PageList = styled.ul`
  padding-left: ${props => props.theme.step * 4}px;
  ${props => props.firstLevel ? `
    margin-right: ${props.theme.step * 8}px
  ` : ''}
`

const PageItem = styled.li`
  list-style: none;
  > ${Link} {
    padding: ${props => props.theme.step}px ${props => props.theme.step * 2}px;
    display: inline-block;
    ${props => props.selected ? `
      background: ${props.theme.colors.background.gray};
      border: 1px solid ${props.theme.colors.border.mid};
      padding: ${props.theme.step - 1}px ${props.theme.step * 2 - 1}px;
    ` : ''}
  }
`

const subtree = (pages, projectId, location, pageId, firstLevel = true) => (
  <PageList firstLevel={firstLevel}>
    {(pages || []).map(page => (
      <PageItem key={page.id} selected={pageId === page.id}>
        <Link to={`/project/${projectId}/pages/${page.id}${location.search}`}>{page.name}</Link>
        {subtree(page.children, projectId, location, pageId, false)}
      </PageItem>
    ))}
  </PageList>
)


export default withRouter(({pages, projectId, location, pageId}) => {

  const [modalOpen, setModalOpen] = useState(false)

  return <PageTree>
    <Button onClick={() => setModalOpen(true)} style={{width: '100%'}}>New</Button>
    {subtree(pages, projectId, location, pageId)}
    <Modal open={modalOpen} size='l' title='New Page' h3 onClose={() => setModalOpen(false)}>
      {pages && <ValidatedForm
        authenticationRequired={true}
        onAction={({pageName}) => PageService.create(pageName, projectId, pageId || pages[0].id)}
        onSuccess={() => setModalOpen(false)}
        clearOnSuccess
        fields={[
          {name: 'pageName', displayName: 'Page Name', required: true}
        ]}>
      </ValidatedForm>}
    </Modal>
  </PageTree>
})