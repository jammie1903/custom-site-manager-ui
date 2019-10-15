import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ProjectService from '../../services/ProjectService'
import EvaluatorService from '../../services/EvaluatorService'
import TemplateService from '../../services/TemplateService'
import { Input, Text, Background } from '../base';
import InputContainer from '../ValidatedForm/InputContainer'

const CalculatedValue = styled(Text)`
  margin: 0 ${props => props.theme.step * 2}px;
  opacity: .7;
`

export default ({pageId}) => {
  const [pageData, setPageData] = useState(null)
  const [template, setTemplate] = useState(null)
  const [updated, setUpdated] = useState(0)

  const onFieldsUpdated = (field, value) => {
    pageData.fields[field] = value
    setUpdated(updated+1)
  }

  useEffect(() => {
    ProjectService.getPageData(pageId)
    .then(setPageData)
  }, [pageId]);

  useEffect(() => {
    if(pageData) {
      TemplateService.getByName(pageData.template).then(setTemplate)
    }
  }, [pageData]);

  const fieldValues = !pageData ? EvaluatorService.placeholder : EvaluatorService.evaluate(pageData.fields)
  const fieldList = [...((template && template.fields) || []), ...((pageData && pageData.customFields) || [])]

  return <Background transparent>
    {fieldList.map((field, index) => (
      <InputContainer
        key={index}
        fieldName={field.name}
        hasValue={pageData.fields[field.name]}
        label={field.name}
      >
        <Input value={pageData.fields[field.name] || ''} onChange={e => onFieldsUpdated(field.name, e.target.value)}/>
        {!!fieldValues && fieldValues[field.name] !== (pageData.fields[field.name] || '') && <CalculatedValue>{fieldValues[field.name]}</CalculatedValue>}
      </InputContainer>
    ))}
  </Background>
}