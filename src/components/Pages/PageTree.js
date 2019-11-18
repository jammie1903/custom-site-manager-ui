import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styled, {css} from 'styled-components'
import { Link, Button } from '../base'
import Modal from '../Modal';
import ValidatedForm from '../ValidatedForm'
import PageService from '../../services/PageService'
import { useDrag, useDrop } from 'react-dnd'
import dragUtils from '../../utils/dragUtils'

const PageTree = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.background.light};
  overflow: auto;
  border-right: 1px solid ${props => props.theme.colors.border.mid};
`

const PageList = styled.ul`
  padding-left: ${props => props.theme.step * 4}px;
  ${props => props.firstLevel ? `
    margin-right: ${props.theme.step * 6}px
  ` : ''}
`

const PageItemElement = styled.li`
  list-style: none;
  position: relative;
  > ${Link} {
    display: inline-block;
    position: relative;
    > span {
      padding: ${props => props.theme.step}px ${props => props.theme.step * 5}px ${props => props.theme.step}px ${props => props.theme.step * 2}px;
      display: inline-block;
    }
    ${props => props.selected ? css`
      > span {
        background: ${props.theme.colors.background.gray};
        border: 1px solid ${props.theme.colors.border.mid};
        padding: ${props.theme.step - 1}px ${props.theme.step * 2 - 1}px;
      }
    ` : ''}
  }

  ${props => props.isDragging ? css`
    opacity: 0.5;
  ` : ``}
`

const DropTarget = styled.div`
  padding: ${props => props.theme.step}px 0;
  margin: -${props => props.theme.step * 2}px ${props => props.theme.step}px 0;

  ${props => !props.isDragging && props.canDrop ? css`
    background: ${props.theme.colors.border.mid};
    z-index: 100;
    position: relative;
    ${props => props.isOver ? css`
      background: ${props.theme.colors.tertiary};
    ` : ``}
    ${props => props.atEnd ? css`
      margin-bottom: ${props.theme.step * 3}px;
    ` : ``}
    ${props => props.nextLevel ? css`
      position: absolute;
      right: 0;
      top: calc(50% - .4em);
      height: .8em;
      width: .8em;
      margin: 0;
      padding: 0;
    ` : ``}
    
  ` : ``}
`


const PageItemDropTarget = ({page, parents, isDragging, atEnd, nextLevel, previousPage, projectId}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: dragUtils.types.PAGE,
    drop: ({id}) => PageService.movePage(projectId, id, !page ? null : page.id, parents[parents.length - 1] || null),
    canDrop: props => (!page || props.id !== page.id) && (!previousPage || previousPage.id !== props.id) && parents.indexOf(props.id) === -1,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  return <DropTarget ref={drop} isOver={isOver} canDrop={canDrop} isDragging={isDragging} atEnd={atEnd} nextLevel={nextLevel}/>
}


const PageItem = ({page, projectId, selectedPageId, location, parents, previousPage}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { 
      type: dragUtils.types.PAGE,
      id: page && page.id
     },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  
  return (
    <PageItemElement selected={page && selectedPageId === page.id} isDragging={isDragging} >
      {!!parents.length && <PageItemDropTarget page={page} parents={parents} projectId={projectId} isDragging={isDragging} previousPage={previousPage}/>}
      {!!page && (
        <Link to={`/project/${projectId}/pages/${page.id}${location.search}`}>
          <span ref={drag}>{page.name}</span>
          {(!page.children || !page.children.length) && <PageItemDropTarget parents={[...parents, page.id]} previousPage={null} projectId={projectId} nextLevel/>}
        </Link>
      )}
      {!!page && subtree(page.children, projectId, location, selectedPageId, false, [...parents, page.id])}
    </PageItemElement>
  )
}

const subtree = (pages, projectId, location, selectedPageId, firstLevel = true, parents = []) => !!pages && !!pages.length && (
  <PageList firstLevel={firstLevel}>
    {pages.map((page, index) => (
      <PageItem key={page.id} page={page} projectId={projectId} selectedPageId={selectedPageId} previousPage={pages[index - 1]} location={location} parents={parents} />
    ))}
    {!firstLevel && <PageItemDropTarget parents={parents} previousPage={pages[pages.length - 1]} projectId={projectId} atEnd/>}
  </PageList>
)

export default withRouter(({pages, projectId, location, pageId}) => {

  const [newPageModalOpen, setNewPageModalOpen] = useState(false)

  return <PageTree>
    <Button onClick={() => setNewPageModalOpen(true)} style={{width: '100%'}}>New</Button>
    {subtree(pages, projectId, location, pageId)}
    <Modal open={newPageModalOpen} size='l' title='New Page' h3 onClose={() => setNewPageModalOpen(false)}>
      {pages && <ValidatedForm
        authenticationRequired={true}
        onAction={({pageName}) => PageService.create(pageName, projectId, pageId || pages[0].id)}
        onSuccess={() => setNewPageModalOpen(false)}
        clearOnSuccess
        fields={[
          {name: 'pageName', displayName: 'Page Name', required: true}
        ]}>
      </ValidatedForm>}
    </Modal>
  </PageTree>
})