"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class PlayList extends BaseController {
    async index() {
        const { ctx, service } = this;
        // 默认 new = 最新 hot = 最热
        const { order = 'new', rn = 30, pn = 1 } = ctx.query;
        const res = await service.playList.index({ order, rn, pn });
        ctx.body = res;
    }
    // 歌单分类
    async getTagPlayList() {
        const { ctx, service } = this;
        const { id, rn = 30, pn = 1 } = ctx.query;
        if (!id) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return false;
        }
        const res = await service.playList.getTagPlayList({ id, rn, pn });
        ctx.body = res;
    }
}
exports.default = PlayList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBRWxELE1BQXFCLFFBQVMsU0FBUSxjQUFjO0lBQ2xELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDN0IsdUJBQXVCO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLLEdBQUcsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFFcEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMzRCxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0lBRUQsT0FBTztJQUNQLEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUN6QyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDVCxJQUFJLEVBQUUsR0FBRztnQkFDVCxPQUFPLEVBQUUsTUFBTTtnQkFDZixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUE7WUFDRCxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUVqRSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0NBQ0Y7QUEzQkQsMkJBMkJDIn0=