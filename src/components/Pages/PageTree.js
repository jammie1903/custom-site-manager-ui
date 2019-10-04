import React from 'react'
import styled from 'styled-components'
import { Link } from '../base'

const PageTree = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.background.white};
  padding: 0 ${props => props.theme.step * 8}px 0 0;
  overflow: auto;
  border-right: 1px solid ${props => props.theme.colors.border.mid};
`

const subtree = (pages, projectId) => (
  <ul>
    {(pages || []).map(page => (
      <li key={page.id}>
        <Link to={`/project/${projectId}/pages/${page.id}`}>{page.name}</Link>
        {subtree(page.children, projectId)}
      </li>
    ))}
  </ul>
)


export default ({pages, projectId}) => (
  <PageTree>
    {subtree(pages, projectId)}
  </PageTree>
)