"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class PlayUrl extends BaseController {
    async index() {
        const { ctx, service } = this;
        const { mid, type } = ctx.query;
        if (!mid) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return false;
        }
        const res = await service.playUrl.getPlayUrl(mid, type);
        ctx.body = res;
    }
}
exports.default = PlayUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheVVybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXlVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtBQUVsRCxNQUFxQixPQUFRLFNBQVEsY0FBYztJQUNqRCxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUUvQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDVCxJQUFJLEVBQUUsR0FBRztnQkFDVCxPQUFPLEVBQUUsTUFBTTtnQkFDZixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUE7WUFDRCxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBRUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFdkQsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztDQUNGO0FBbkJELDBCQW1CQyJ9