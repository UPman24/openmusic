const BaseService = require('./BaseService')

export default class PlayUrl extends BaseService {
  async getPlayUrl (mid, br = '128kmp3') {
    return this.commonRequest(`http://www.kuwo.cn/api/v1/www/music/playUrl?mid=${mid}&type=convert_url3&br=${br}`)
  }
}
