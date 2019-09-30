import React from "react";
import styled from 'styled-components'
import HeaderPane from "./HeaderPane";
import { Background } from "../base";


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
  align-items: center;
  justify-content: center;
  min-height: min-content;
`

const BackgroundContainer = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;
`

export default props => (
  <UI>
    <HeaderPane />
    <BackgroundContainer>
      <Background>{props.children}</Background>
    </BackgroundContainer>
  </UI>
);
