"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class AlbumInfo extends BaseController {
    async index() {
        const { ctx, service } = this;
        const { albumId, pn = 1, rn = 30 } = ctx.query;
        if (!albumId) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return false;
        }
        const res = await service.albumInfo.getList({ albumId, pn, rn });
        ctx.body = res;
    }
}
exports.default = AlbumInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxidW1JbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxidW1JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFFbEQsTUFBcUIsU0FBVSxTQUFRLGNBQWM7SUFDbkQsS0FBSyxDQUFDLEtBQUs7UUFDVCxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUM3QixNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFFOUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFBO1lBQ0QsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDaEUsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztDQUNGO0FBakJELDRCQWlCQyJ9