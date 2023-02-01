"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class Rank extends BaseController {
    async index() {
        const { ctx, service } = this;
        const res = await service.rank.index();
        ctx.body = res;
    }
    // 排行榜音乐
    async rankMusicList() {
        const { ctx, service } = this;
        const { bangId = 93, pn = 1, rn = 30 } = ctx.query;
        const res = await service.rank.getRankMusicList({ bangId, pn, rn });
        ctx.body = res;
    }
    // 推荐榜单
    async rankRecBangList() {
        const { ctx, service } = this;
        const res = await service.rank.getRecBangList();
        ctx.body = res;
    }
}
exports.default = Rank;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtBQUVsRCxNQUFxQixJQUFLLFNBQVEsY0FBYztJQUM5QyxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN0QyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0lBRUQsUUFBUTtJQUNSLEtBQUssQ0FBQyxhQUFhO1FBQ2pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxPQUFPO0lBRVAsS0FBSyxDQUFDLGVBQWU7UUFDbkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDN0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQy9DLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQ2hCLENBQUM7Q0FDRjtBQXRCRCx1QkFzQkMifQ==