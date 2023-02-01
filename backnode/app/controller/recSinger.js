"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jsdoc/check-param-names */
const BaseController = require('./BaseController');
class RecSinger extends BaseController {
    /**
     * @param {number} category //  11 華語  13 歐美  12 日韓 16 組合
     * @param {number} pn 分页
     * @param {number} rn 每页数据
     */
    async index() {
        const { ctx, service } = this;
        const { category = 1, pn = 5, rn = 1 } = ctx.query;
        const res = await service.recSinger.index({ category, pn, rn });
        ctx.body = res;
    }
}
exports.default = RecSinger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjU2luZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVjU2luZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTRDO0FBQzVDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBRWxELE1BQXFCLFNBQVUsU0FBUSxjQUFjO0lBQ25EOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMvRCxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0NBQ0Y7QUFaRCw0QkFZQyJ9