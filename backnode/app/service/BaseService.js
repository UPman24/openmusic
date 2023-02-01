"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetData = void 0;
const egg_1 = require("egg");
const uuid_1 = require("uuid");
class BaseService extends egg_1.Service {
    constructor() {
        super(...arguments);
        this.timeoutCount = 0;
    }
    _headers(opts) {
        return Object.assign({ Cookie: 'Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1623339177,1623339183; _ga=GA1.2.1195980605.1579367081; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1623339982; kw_token=3E7JFQ7MRPL; _gid=GA1.2.747985028.1623339179; _gat=1', csrf: '3E7JFQ7MRPL', Host: 'www.kuwo.cn', Referer: 'http://www.kuwo.cn/', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36' }, opts);
    }
    async commonRequest(url, options) {
        const opts = Object.assign(Object.assign({ method: 'GET', dataType: 'json', timeout: 60000 }, options), { headers: this._headers(options === null || options === void 0 ? void 0 : options.headers) });
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this;
        return handleGetData(_this, url, opts);
    }
}
module.exports = BaseService;
/**
 * @param _this
 * @param url
 * @param opts
 */
function handleGetData(_this, url, opts) {
    const reqId = uuid_1.v4();
    return _this.ctx.curl(`${url}&reqId=${reqId}`, opts).then(res => {
        _this.logger.info({
            req: Object.assign({}, opts, { ctx: undefined }),
            url,
            reqId,
            status: res.status,
            res: JSON.stringify(res.data),
        });
        _this.timeoutCount = 0;
        return res.data;
    }).catch(e => {
        _this.logger.info({
            req: Object.assign({}, opts, { ctx: undefined }),
            url,
            reqId,
            error: e,
            res: null,
        });
        // 失败自动重试
        if (_this.timeoutCount <= 2) {
            _this.timeoutCount++;
            return handleGetData(_this, url, opts);
        }
        _this.timeoutCount = 0;
        throw e;
    });
}
exports.handleGetData = handleGetData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCYXNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IsK0JBQW1DO0FBRW5DLE1BQU0sV0FBWSxTQUFRLGFBQU87SUFBakM7O1FBWUUsaUJBQVksR0FBRyxDQUFDLENBQUE7SUFjbEIsQ0FBQztJQXpCQyxRQUFRLENBQUUsSUFBSTtRQUNaLHVCQUNFLE1BQU0sRUFBRSxvTkFBb04sRUFDNU4sSUFBSSxFQUFFLGFBQWEsRUFDbkIsSUFBSSxFQUFFLGFBQWEsRUFDbkIsT0FBTyxFQUFFLHFCQUFxQixFQUM5QixZQUFZLEVBQUUsK0dBQStHLElBQzFILElBQUksRUFDUjtJQUNILENBQUM7SUFJRCxLQUFLLENBQUMsYUFBYSxDQUFFLEdBQUcsRUFBRSxPQUFPO1FBQy9CLE1BQU0sSUFBSSxpQ0FDUixNQUFNLEVBQUUsS0FBSyxFQUNiLFFBQVEsRUFBRSxNQUFNLEVBQ2hCLE9BQU8sRUFBRSxLQUFLLElBQ1gsT0FBTyxLQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLENBQUMsR0FDekMsQ0FBQTtRQUNELDREQUE0RDtRQUM1RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDbEIsT0FBTyxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQTtBQUM1Qjs7OztHQUlHO0FBQ0gsU0FBZ0IsYUFBYSxDQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUM3QyxNQUFNLEtBQUssR0FBRyxTQUFNLEVBQUUsQ0FBQTtJQUN0QixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM5RCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQ2hELEdBQUc7WUFDSCxLQUFLO1lBQ0wsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDOUIsQ0FBQyxDQUFBO1FBQ0YsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUE7UUFFdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNYLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDaEQsR0FBRztZQUNILEtBQUs7WUFDTCxLQUFLLEVBQUUsQ0FBQztZQUNSLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFBO1FBQ0YsU0FBUztRQUNULElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFBO1lBQ3BCLE9BQU8sYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDdkM7UUFFRCxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtRQUV0QixNQUFNLENBQUMsQ0FBQTtJQUNULENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQS9CRCxzQ0ErQkMifQ==