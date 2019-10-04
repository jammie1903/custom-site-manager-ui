import React from "react";
import styled from 'styled-components'
import HeaderPane from "./HeaderPane"

const UI = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  text-align: left;
  min-height: min-content;
`

const Content = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  position: relative;
`

export default props => (
  <UI>
    <HeaderPane />
    <Content>
      {props.children}
    </Content>
  </UI>
);
