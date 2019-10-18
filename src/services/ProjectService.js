import ApiService from './ApiService'
import EventEmitter from 'events'

let _projects = null
const emmiter = new EventEmitter()
let allLoaded = false

class ProjectService {
  async getAll() {
    try {
      if(allLoaded) {
        emmiter.emit('all', _projects)
        return _projects
      }

      const response = await ApiService.get('project/all')
      const projects = (await response.json()).data
      allLoaded = !!projects

      if(allLoaded) {
        _projects = projects
      }
      projects.forEach(p => { 
        emmiter.emit(p.id, p)
        if(p && p.build && p.build.status === 'pending') {
          setTimeout(() => this.get(p.id, true), 10000)
        }
      })
      emmiter.emit('all', _projects)
      return projects
    } catch(e) {
      console.error(e)
      return null
    }
  }

  refresh() {
    allLoaded = false
    this.getAll()
  }

  subscribe(id, listener) {
    emmiter.on(id, listener)
    if(id === 'all') {
      this.getAll()
    } else {
      this.get(id)
    }
  }

  unsubscribe(id, listener) {
    emmiter.removeListener(id, listener)
  }

  async get(id, forceUpdate = false) {
    if(!forceUpdate && _projects != null) {
      const existingProject = _projects.find(p => p.id === id)
      if(existingProject){
        emmiter.emit(id, existingProject)
        return existingProject
      }
    }

    const response = await ApiService.get(`project/${id}`)
    const project = (await response.json()).data

    if(project) {
      this.addToList(project);
    }

    emmiter.emit(id, project)
    if(project && project.build && project.build.status === 'pending') {
      setTimeout(() => this.get(id, true), 10000)
    }

    if(allLoaded) {
      emmiter.emit('all', _projects)
    }

    return project
  }

  addToList(project) {
    if (_projects) {
      const index = _projects.findIndex(p => p.id === project.id)
      if (index === -1) {
        _projects.push(project)
      }
      else {
        _projects[index] = project
      }
    }
    else {
      _projects = [project]
    }
  }

  async getPages() {
    return [
      {id: '9376245057', name: 'Articles', children: [
        {id: '24532737', name: 'Article 1', children: []},
        {id: '24532738', name: 'Article 2'},
        {id: '24532739', name: 'Article 3'}
      ]},
      {id: '245f32739', name: 'Home'}
    ];
  }

  async getPageData(id) {
    return {
      template: 'default',
      fields: {
        title: 'Article ' + id,
        summary: '{{title}} blah blah blah blah',
        date: new Date(),
        myCustomField: 'test'
      },
      layout: [
        {type: 'Section', properties: { children: [
          {type: 'Header', properties: {type: 'H2', text: '{{title}}'}},
          {type: 'Text', properties: {text: 'this is some text'}}
        ]}}
      ],
      customFields: [{name: 'My Custom Field', type: 'text'}],
    }
  }
}

export default new ProjectService()
