const axios = require('axios').default;
const lodash = require('lodash');

class HttpService {

  constructor(baseUrl, contentType, accept, authType, accessToken) {
    this._baseUrl = baseUrl;
    this._contentType = contentType;
    this._accept = accept;
    this._authType = authType;
    this._accessToken = accessToken;
  }

  request(path, options) {
    return axios
      .create({
        baseURL: this._baseUrl,
        headers: this._buildHeaders()
      })
      .request(path, options)
  }

  get(path, params) {
    return new Promise((resolve) => {
      resolve(this.request(path, lodash.assign(
        {method: 'GET'},
        params ? { params } : {}
      )))
    })
  }

  post(path, data) {
    return new Promise((resolve) => {
      resolve(this.request(path, lodash.assign(
        {method: 'POST'},
        data ? { data } : {}
      )))
    })
  }

  _buildHeaders() {
    const accessToken = this._accessToken;
    const authType = this._authType;
    const contentType = this._contentType;
    const accept = this._accept;

    return {
      Authorization: accessToken && authType ? `${authType} ${accessToken}` : '',
      ContentType: contentType ? contentType : 'application/json',
      Accept: accept ? accept : 'application/json'
    }
  }
}

export default HttpService;