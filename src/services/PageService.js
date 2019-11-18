import ApiService from './ApiService'
import { EventEmitter } from 'events';

const emmiter = new EventEmitter()
const treeCache = {}
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
        if(treeCache[projectId]) return treeCache[projectId]
      const response = await ApiService.get(`page/project/tree/${projectId}`)
      treeCache[projectId] = (await response.json()).data
      return treeCache[projectId]
    } catch(e) {
      console.error(e)
      return null
    }
  }

  async refreshTree(projectId) {
    treeCache[projectId] = null
    Object.keys(pageCache).forEach(k => {
      if(pageCache[k] && pageCache[k].projectId === projectId) {
        delete pageCache[k]
      }
    })
    const tree = await this.getTree(projectId)
    emmiter.emit(projectId, tree)
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

    await this.refreshTree(projectId)

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

  async movePage(projectId, pageId, nextPage, parentPage) {
    const response = await ApiService.put('page', {
      id: pageId, 
      nextSiblingId: nextPage,
      parentId: parentPage
    })
    if(response.ok) {
      await this.refreshTree(projectId)
    }
  }
}

export default new PageService()
