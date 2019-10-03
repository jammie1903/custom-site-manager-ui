import UserService from './UserService'

const root = process.env.REACT_APP_LOCAL === 'true' ? 'http://localhost:3001/' : 'https://custom-site-manager-api.herokuapp.com/'

export class ApiService {
  request(url, method, body = null, authenticationRequired = true) {
    const token = UserService.token

    if(authenticationRequired && !token) throw new Error('user is not yet authenticated')

    const headers = {
      'Content-Type': 'application/json',
      ...(authenticationRequired && {'Authorization': 'Bearer ' + token})
    }
    
    return fetch(root + url, {
      headers,
      method,
      body: !body || typeof body === 'string' ? body : JSON.stringify(body)
    })
  }

  get(url, authenticationRequired = true) {
    return this.request(url, 'GET', null, authenticationRequired) 
  }

  post(url, body = null, authenticationRequired = true) {
    return this.request(url, 'POST', body, authenticationRequired) 
  }
  
  put(url, body = null, authenticationRequired = true) {
    return this.request(url, 'put', body, authenticationRequired) 
  }
  
  delete(url, body = null, authenticationRequired = true) {
    return this.request(url, 'delete', body, authenticationRequired) 
  }
}

export default new ApiService()
