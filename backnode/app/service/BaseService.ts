import { Service } from 'egg'
import { v4 as uuidv4 } from 'uuid'

class BaseService extends Service {
  _headers (opts) {
    return {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
      Referer: 'http://kuwo.cn/',
      Secret: '6c3e1759abe6bd58f56bb713f6aee0bb738189eae7837be83636389b96fd4d7104c13520',
      Cookie: 'Hm_Iuvt_cdb524f42f0ce19b169b8072123a4727=2bm5QbPQKPZSRHyFN4pbZnGcNJ4J2DZJ',
      ...opts,
    }
  }

  timeoutCount = 0

  async commonRequest (url, options) {
    const opts = {
      method: 'GET',
      dataType: 'json',
      timeout: 60000,
      ...options,
      headers: this._headers(options?.headers),
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    return handleGetData(_this, url, opts)
  }
}

module.exports = BaseService
/**
 * @param _this
 * @param url
 * @param opts
 */
export function handleGetData (_this, url, opts) {
  const reqId = uuidv4()
  return _this.ctx.curl(`${url}&reqId=${reqId}`, opts).then(res => {
    _this.logger.info({
      req: Object.assign({}, opts, { ctx: undefined }),
      url,
      reqId,
      status: res.status,
      res: JSON.stringify(res.data),
    })
    _this.timeoutCount = 0

    return res.data
  }).catch(e => {
    _this.logger.info({
      req: Object.assign({}, opts, { ctx: undefined }),
      url,
      reqId,
      error: e,
      res: null,
    })
    // 失败自动重试
    if (_this.timeoutCount <= 2) {
      _this.timeoutCount++
      return handleGetData(_this, url, opts)
    }

    _this.timeoutCount = 0

    throw e
  })
}
