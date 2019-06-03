import React, { Component } from 'react'
import styled from 'styled-components'
import InputContainer from './InputContainer'
import {Input, Button, Text} from '../base'
import { setStateAsync } from '../../utils'
import ApiService from '../../services/ApiService'

const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
`

export default class ValidatedForm extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      formData: this.props.fields.reduce((acc, field) => {
        acc[field.name] = field.value !== undefined ? field.value : ''
        return acc
      }, {}),
      formErrors: {},
      responseMessage: '',
      success: null
    }
    this._inputs = {}
  }

  onSubmit (e) {
    e.preventDefault()
    if(this.state.submitting) return

    const formErrors = {}
    this.props.fields.forEach(field => { formErrors[field.name] = this.validateField(field) })
    this.setState({formErrors, responseMessage: null}, () => {
      const valid = Object.values(this.state.formErrors).every(error => !error)
      if (valid) {
        this.ajaxSubmitForm()
      }
    })
  }

  /**
   * Submits the form via ajax
   * @returns {Promise<{}>} a promise resolving to the returned json response
   */
  async ajaxSubmitForm () {
    const request = ApiService.request(
      this.props.action, 
      this.props.method || 'POST',
      this.state.formData,
      this.props.authenticationRequired
    )

    const [response] = await Promise.all([
      request, 
      setStateAsync(this)({submitting: true})
    ])

    let json, success
    try {
      success = response.ok
      json = await response.json()
    } catch (err) {
      if (!success) {
        console.error(new Error(response.status))
      } else {
        console.error(err)
      }
      json = {}
    }
    this.handleResponse(success, json)
  }

  /**
   * Handles the response of the ajax request, showing messages and validation errors if returned and emitting an appropriate event
   * @param {Object} response the json response from the request
   */
  handleResponse = (success, response) => {
    this.setState({
      submitting: false,
      success,
      responseMessage: response.message && (!response.errors || !Object.keys(response.errors).length) ? response.message : '',
      formErrors: response.errors || {}
    }, () => {
      if (success) {
        if (typeof this.props.onSuccess === 'function') {
          try {
            this.props.onSuccess(response.data)
          } catch (e) {
            console.error(e)
          }
        }
        if (this.props.clearOnSuccess) {
          this.setState({
            formData: this.props.fields.reduce((acc, field) => {
              acc[field.name] = ''
              return acc
            }, {})
          })
        }
      }
    })
  }

  handleInputChange (event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    })
  }

  handleCancel = () => {
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel()
    }
  }

  /**
   * Checks if an element mathces the other specified field, if equality of a field is required
   * @param {Object} field the field information
   * @returns {ReactElement} an error if found, else null
   */
  checkEqualTo (field) {
    if (field.equalTo && this.state.formData[field.name] !== this.state.formData[field.equalTo]) {
      return `${field.displayName} does not match ${this.props.fields.find(f => f.name === field.equalTo).displayName}`
    }
    return null
  }

  validateField (field) {
    const input = this._inputs[field.name]
    input.checkValidity()

    if (input.validity.valid) {
      return this.checkEqualTo(field) || null
    }

    if (input.validity.valueMissing) {
      return `Please enter a ${field.displayName}`
    }

    return `Please enter a valid ${field.displayName}`
  }

  renderField (field) {
    let input = null

    switch (field.type) {
      case 'hidden':
        return (
          <input
            ref={c => (this._inputs[field.name] = c)}
            key={field.name}
            id={field.name}
            name={field.name}
            type={field.type}
            value={this.state.formData[field.name]}
          />
        )
      case 'select':
        input = this.createSelect(field)
        break
      default: input = this.createInput(field)
    }

    return (
      <InputContainer
        key={field.name}
        fieldName={field.name}
        hasValue={this.state.formData[field.name]}
        label={field.displayName}
        error={this.state.formErrors[field.name]}
      >
        {input}
      </InputContainer>
    )
  }

  createSelect (field) {
    return (
      <select
        ref={c => (this._inputs[field.name] = c)}
        id={field.name}
        name={field.name}
        value={this.state.formData[field.name]}
        required={field.required}
        onChange={this.handleInputChange}
      >
        {field.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    )
  }

  createInput (field) {
    return (
      <Input
        ref={c => (this._inputs[field.name] = c)}
        id={field.name}
        name={field.name}
        type={field.type}
        value={this.state.formData[field.name]}
        maxLength={field.maxLength}
        minLength={field.minLength}
        required={field.required}
        onChange={this.handleInputChange}
      />
    )
  }

  render () {
    return (
      <form noValidate onSubmit={this.onSubmit} ref={c => (this._formElement = c)}>
        {this.props.fields.map(field => this.renderField(field))}
        <div className='row no-wrap'>
          <SubmitContainer>
            <Button type='submit' loading={this.state.submitting}>
              Submit
            </Button>
            <Text error={!this.state.success} style={{marginLeft: '8px'}}>{this.state.responseMessage}</Text>
          </SubmitContainer>
        </div>
      </form>
    )
  }
}
