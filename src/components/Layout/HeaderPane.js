import React from 'react';
import styled from 'styled-components'
import { H1 } from '../base';

const Container = styled.div`
  width: 100%;
  height: 60px;
  text-align: left;
  padding: 0 ${props => props.theme.step * 4}px;
  border-bottom: 1px solid ${props => props.theme.colors.border.dark};
  background: ${props=> props.theme.colors.background.colorful};
`

export default () => (
  <Container>
    <H1 light>Site Manager</H1>
  </Container>
)
