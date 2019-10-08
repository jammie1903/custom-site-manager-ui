import jwtDecode from 'jwt-decode'

export class UserService {
  constructor() {
    this._token = this.token

    try {
      this._userDetails = this._token ? jwtDecode(this._token) : null
    } catch(e) {
      console.error(e)
      this._token = null
      localStorage.removeItem('token')
    }
  }

  get token() {
    return this._token || localStorage.getItem('token')
  }

  set token(token) { 
    this._token = token
    try {
      this._userDetails = token ? jwtDecode(token) : null
      localStorage.setItem('token', token)
    } catch(e) {
      console.error(e)
      this._userDetails = null
      localStorage.removeItem('token')
    }
  }

  get userDetails () {
    return this._userDetails
  }

  get isLoggedIn () {
    return this._userDetails != null
  }
}

export default new UserService()