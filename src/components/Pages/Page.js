

import React from 'react'
import { TabPane, Tab, TabList, TabContent, TabContentContainer } from '../Tabs'
import TransitionLayer from '../base/TransitionLayer'
import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { Background } from '../base';
import FieldsTab from './FieldsTab';
import LayoutTab from './LayoutTab';

const Content = styled(TransitionGroup)`
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  position: relative;
  display: flex;
`

export default ({pageId}) => (
  <TabPane defaultTab='fields'>
    <TabList>
      <Tab id='fields'>Fields</Tab>
      <Tab id='layout'>Layout</Tab>
    </TabList>
    <TransitionLayer transitionGroupComponent={Content}>
      <Background unpadded white>
        <TabContentContainer>
          <TabContent id='fields'><FieldsTab pageId={pageId} /></TabContent>
          <TabContent id='layout'><LayoutTab pageId={pageId} /></TabContent>
        </TabContentContainer>
      </Background>
    </TransitionLayer>
  </TabPane>
)