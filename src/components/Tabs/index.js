import React from 'react'
import { withRouter } from 'react-router'
import { CSSTransition } from 'react-transition-group'
import qs from 'qs'
import { Link, Section, Background } from '../base'
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
  return <TabGroup.Consumer>
    {({tabGroupName, defaultTab}) => {
      const tab = qs.parse(location.search, { ignoreQueryPrefix: true })[tabGroupName]
      return (
        <CSSTransition
          in={(defaultTab === id && !tab) || id === tab}
          timeout={800}
          classNames="fade"
          unmountOnExit
        >
          <Background unpadded transparent>
            <Section>
              {children}
            </Section>
          </Background>
        </CSSTransition>
      )
    }}
  </TabGroup.Consumer>
})

export const TabList = styled.div`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border.mid};
  background: ${props => props.theme.colors.background.gray};
`

export const TabContentContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  position: relative;
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
