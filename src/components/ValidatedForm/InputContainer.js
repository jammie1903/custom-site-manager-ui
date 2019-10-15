import React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  text-align: left;
  width: 100%;
`

const Label = styled.label`
  transition: all ${props => props.theme.animationLengths.short}ms;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 18px;
`

const ErrorMessage = styled.div`
  margin: 2px 0;
  font-size: 14px;
  color: ${props => props.theme.colors.text.error};
  transition: color ${props => props.theme.animationLengths.short};

  &:empty {
    color: transparent;

    &:after {
      content: '\a0';
    }
  }
`

export default props => (
  <InputContainer className={props.hasValue ? 'has-value' : ''}>
    <Label htmlFor={props.fieldName}>
      {props.label}
    </Label>
    {props.children}
    <ErrorMessage>{props.error}</ErrorMessage>
  </InputContainer>
)
