import ApiService from './ApiService'
import { EventEmitter } from 'events';

const emmiter = new EventEmitter()
let treeCache = null
const pageCache = {}

// function recursiveSearch(treeItems, id) {
//   for(let i of treeItems) {
//     if(i.id === id) return i
//     const matchedChild = recursiveSearch(i.children, id)
//     if(matchedChild) return matchedChild
//   }
//   return null
// }


class PageService {
  async getTree(projectId) {
    try {
      if(treeCache) return treeCache
      const response = await ApiService.get(`page/project/tree/${projectId}`)
      treeCache = (await response.json()).data
      return treeCache
    } catch(e) {
      console.error(e)
      return null
    }
  }

  refrshTree() {
    treeCache = null
  }

  async subscribeToTree(projectId, listener) {
    emmiter.on(projectId, listener)
    listener(await this.getTree(projectId))
  }

  unsubscribeToTree(projectId, listener) {
    emmiter.removeListener(projectId, listener)
  }

  async create(name, projectId, parentId) {
    const page = {
      projectId,
      parentId,
      name,
      fields: {
        Name: name,
        Title: name,
        Url: name.toLowerCase().replace(/\s+/g, '-')
      },
      layout: [],
      customFields: []
    }
    const response = await ApiService.post('page', page)

    if(!response.ok) {
      throw new Error('An error occured whilst trying to create the page')
    }

    const persistedPage = (await response.json()).data
    pageCache[persistedPage.id] = persistedPage

    this.refrshTree()
    const tree = await this.getTree(projectId)
    emmiter.emit(projectId, tree)

    return persistedPage
  }

  async get(id) {
    try {
      if(pageCache[id]) return pageCache[id]
      const response = await ApiService.get(`page/${id}`)
      const page = (await response.json()).data
      pageCache[id] = page
      return page
    } catch(e) {
      console.error(e)
      return null
    }

    // return {
    //   template: 'default',
    //   fields: {
    //     title: 'Article ' + id,
    //     summary: '{{title}} blah blah blah blah',
    //     date: new Date(),
    //     myCustomField: 'test'
    //   },
    //   layout: [
    //     {type: 'Section', properties: { children: [
    //       {type: 'Header', properties: {type: 'H2', text: '{{title}}'}},
    //       {type: 'Text', properties: {text: 'this is some text'}}
    //     ]}}
    //   ],
    //   customFields: [{name: 'My Custom Field', type: 'text'}],
    // }
  }
}

export default new PageService()
