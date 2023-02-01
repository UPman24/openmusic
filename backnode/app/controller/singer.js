"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class Singer extends BaseController {
    /**
     * @param {number} category  分类  0 = 全部 1 = 华语男 2 = 华语女 3 = 华语组合 4 = 日韩男 5 = 日韩女 6 = 日韩组合 7 = 欧美男 8 = 欧美女  9 = 欧美组合  10 = 其他
     * @param {number} rn  每页数据
     * @param {number} pn   分页
     * @param {string} prefix   A~Z 分类
     */
    async getArtistInfo() {
        const { ctx, service } = this;
        const { category = 0, rn = 50, pn = 1, prefix, } = ctx.query;
        const res = await service.singer.getArtistInfo({ category, rn, pn, prefix });
        ctx.body = res;
    }
    // 歌手单曲
    async getArtistMusic() {
        const { ctx, service } = this;
        const { artistid, rn = 30, pn = 1, } = ctx.query;
        if (!artistid) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.singer.getArtistMusic({ artistid, rn, pn });
        ctx.body = res;
    }
    // 获取歌手专辑
    async getArtistAlbum() {
        const { ctx, service } = this;
        const { artistid, rn = 30, pn = 1, } = ctx.query;
        if (!artistid) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.singer.getArtistAlbum({ artistid, rn, pn });
        ctx.body = res;
    }
    // 获取歌手mv
    async getArtistMv() {
        const { ctx, service } = this;
        const { artistid, rn = 30, pn = 1, } = ctx.query;
        if (!artistid) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.singer.getArtistMv({ artistid, rn, pn });
        ctx.body = res;
    }
}
exports.default = Singer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFFbEQsTUFBcUIsTUFBTyxTQUFRLGNBQWM7SUFDaEQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUM3QixNQUFNLEVBQ0osUUFBUSxHQUFHLENBQUMsRUFDWixFQUFFLEdBQUcsRUFBRSxFQUNQLEVBQUUsR0FBRyxDQUFDLEVBQ04sTUFBTSxHQUNQLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUViLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBRTVFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxPQUFPO0lBQ1AsS0FBSyxDQUFDLGNBQWM7UUFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDN0IsTUFBTSxFQUNKLFFBQVEsRUFDUixFQUFFLEdBQUcsRUFBRSxFQUNQLEVBQUUsR0FBRyxDQUFDLEdBQ1AsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBRWIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFBO1lBQ0QsT0FBTTtTQUNQO1FBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUVyRSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0lBRUQsU0FBUztJQUNULEtBQUssQ0FBQyxjQUFjO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sRUFDSixRQUFRLEVBQ1IsRUFBRSxHQUFHLEVBQUUsRUFDUCxFQUFFLEdBQUcsQ0FBQyxHQUNQLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUViLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQTtZQUNELE9BQU07U0FDUDtRQUVELE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDckUsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztJQUVELFNBQVM7SUFFVCxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzdCLE1BQU0sRUFDSixRQUFRLEVBQ1IsRUFBRSxHQUFHLEVBQUUsRUFDUCxFQUFFLEdBQUcsQ0FBQyxHQUNQLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUViLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQTtZQUNELE9BQU07U0FDUDtRQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDbEUsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztDQUNGO0FBekZELHlCQXlGQyJ9