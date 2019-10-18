import ApiService from './ApiService'

let _templates = null
let allLoaded = false

const defaultFields = [
  {name: 'Name', type: 'url-segment', mandatory: true},
  {name: 'Title', type: 'text', mandatory: true, defaultValue: '{{name}}'},
  {name: 'Url', type: 'url-segment', mandatory: true, defaultValue: '{{name}}'},
  {name: 'Description', type: 'text', mandatory: false},
  {name: 'Thumbnail', type: 'url', mandatory: false}
]

class TemplateService {
  async getAll() {
    try {
      if(allLoaded) {
        return _templates
      }
      const response = await ApiService.get('template/all')
      const templates = (await response.json()).data

      allLoaded = !!templates

      if(allLoaded) {
        _templates = templates
      }

      return templates
    } catch(e) {
      console.error(e)
      return null
    }
  }

  refresh() {
    allLoaded = false
    this.getAll()
  }

  async getByName(name) {
    return {
      name,
      fields: defaultFields,
      layout: null
    }
  }

  async get(id, forceUpdate = false) {
    if(!forceUpdate && _templates != null) {
      const existingTemplate = _templates.find(p => p.id === id)
      if(existingTemplate){
        return existingTemplate
      }
    }

    const response = await ApiService.get(`template/${id}`)
    const template = (await response.json()).data

    if(template) {
      this.addToList(template);
    }

    return template
  }

  addToList(template) {
    if (_templates) {
      const index = _templates.findIndex(p => p.id === template.id)
      if (index === -1) {
        _templates.push(template)
      }
      else {
        _templates[index] = template
      }
    }
    else {
      _templates = [template]
    }
  }
}


export default new TemplateService()