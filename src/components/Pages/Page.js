

import React from 'react'
import { TabPane, Tab, TabList, TabContent } from '../Tabs'

export default () => (
  <TabPane defaultTab='fields'>
    <TabList>
      <Tab id='fields'>Fields</Tab>
      <Tab id='layout'>Layout</Tab>
    </TabList>
    <TabContent id='fields'>This is the fields page</TabContent>
    <TabContent id='layout'>This is the layout page</TabContent>
  </TabPane>
)