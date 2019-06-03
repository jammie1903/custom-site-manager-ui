import jwtDecode from 'jwt-decode'

export class UserService {
  constructor() {
    this._token = this.token
    this._userDetails = this._token ? jwtDecode(this._token) : null
  }

  get token() {
    return this._token || localStorage.getItem('token')
  }

  set token(token) { 
    this._token = token
    localStorage.setItem('token', token)
    this._userDetails = token ? jwtDecode(token) : null
    console.log(this._userDetails)
  }

  get userDetails () {
    return this._userDetails
  }

  get isLoggedIn () {
    return this._userDetails != null
  }
}

export default new UserService()