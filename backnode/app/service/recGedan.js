"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class RecGedan extends BaseService {
    async index({ id, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/rcm/index/playlist?id=${id}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
}
exports.default = RecGedan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjR2VkYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWNHZWRhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUU1QyxNQUFxQixRQUFTLFNBQVEsV0FBVztJQUMvQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDekIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9EQUFvRCxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUNySCxDQUFDO0NBQ0Y7QUFKRCwyQkFJQyJ9