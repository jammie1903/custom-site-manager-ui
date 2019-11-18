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

  refreshTree() {
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

    this.refreshTree()
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
  }

  async movePage(pageId, previousPage, parentPage) {
    
  }
}

export default new PageService()
