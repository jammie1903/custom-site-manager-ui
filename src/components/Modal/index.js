import React, { Component } from "react";
import styled from "styled-components";
import { Panel } from "../base";
import Cross from "../../icons/Cross";

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.7);
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
  text-align: center;
  min-height: min-content;
  z-index: 10000;
  transition: opacity ${props => props.theme.animationLengths.medium}ms;
  opacity: ${props => (props.open ? 1 : 0)};
  pointer-events: ${props => (props.open ? "auto" : "none")};
`;

const CloseButton = styled.button`
  background: transparent;
  padding: 0;
  border: none;
  font-size: 18px;
  line-height: 0;
  cursor: pointer;

  :focus {
    outline: none;
  }
`;

export default class Modal extends Component {
  emitClose = () => {
    if (typeof this.props.onClose === "function") {
      this.props.onClose();
    }
  };

  render() {
    const headerContent = <CloseButton onClick={this.emitClose}>
      <Cross light/>
    </CloseButton>

    return (
      <Backdrop open={this.props.open}>
        <Panel size={this.props.size} title={this.props.title} headerContent={headerContent}>
          {this.props.children}
        </Panel>
      </Backdrop>
    );
  }
}
