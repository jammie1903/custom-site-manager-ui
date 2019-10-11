import React from 'react'

import Header from './Header'
import Text from './Text'
import Section from './Section'

export const map = {
  Header,
  Section,
  Text
}

export function mapChildren(children) {
  return children.map((data, index) => {
    const Component = map[data.type]
    return Component && <Component key={index} data={data} />
  })
}
