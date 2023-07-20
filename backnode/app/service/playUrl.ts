import fetch from 'node-fetch';

const BaseService = require('./BaseService')

export default class PlayUrl extends BaseService {
  async getPlayUrl (mid) {
    let url = 'http://0.0.0.0:8899/kw/url/' + mid
    // mid, br = '128kmp3'
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        data: {
          code: 400,
          url: ''
        }
      }
    }
  }
}
