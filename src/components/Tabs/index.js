import React from 'react'
import {withRouter, Redirect} from 'react-router'
import qs from 'qs'
import { Link } from '../base'
import styled from 'styled-components'

const TabGroup = React.createContext({tabGroupName: 'tab', defaultTab: ''})

const TabLink = styled(Link)`
  max-width: 180px;
  min-width: 180px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin: 0;
  text-align: center;
  ${({theme, selected}) => selected && `
    background: ${theme.colors.background.white};
  `}
`

export const Tab = withRouter(({children, id, location}) => {
  const tab = qs.parse(location.search, { ignoreQueryPrefix: true }).tab
  return <TabGroup.Consumer>
    {({tabGroupName, defaultTab}) => <TabLink selected={(defaultTab === id && !tab) || id === tab} to={`?${tabGroupName}=${id}`}>{children}</TabLink>}
  </TabGroup.Consumer>
})


export const TabContent = withRouter(({children, id, location}) => {
  const tab = qs.parse(location.search, { ignoreQueryPrefix: true }).tab
  return <TabGroup.Consumer>
    {({tabGroupName, defaultTab}) => <div hidden={!((defaultTab === id && !tab) || id === tab)}>{children}</div>}
  </TabGroup.Consumer>
})

export const TabList = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 0 16px;
  overflow-x: auto;
  display: flex;
  border: 1px solid #d7d7d7;
  background: #eef0f3;
`

const TabPaneContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const TabPane = ({tabGroupName = 'tab', children, defaultTab}) => (
  <TabPaneContainer>
    <TabGroup.Provider value={{tabGroupName, defaultTab}}>
      {children}
    </TabGroup.Provider>
  </TabPaneContainer>
)
