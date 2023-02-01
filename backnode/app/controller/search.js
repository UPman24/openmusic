"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class Search extends BaseController {
    // 关键字搜索
    async searchKey() {
        const { ctx, service } = this;
        const { key } = ctx.query;
        const res = await service.search.searchKey(key);
        ctx.body = res;
    }
    // 单曲搜索
    async searchMusicBykeyWord() {
        const { ctx, service } = this;
        const { key, pn = 1, rn = 30 } = ctx.query;
        if (!key) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.search.searchMusicBykeyWord({ key, pn, rn });
        ctx.body = res;
    }
    // 专辑搜索
    async searchAlbumBykeyWord() {
        const { ctx, service } = this;
        const { key, pn = 1, rn = 30 } = ctx.query;
        if (!key) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.search.searchAlbumBykeyWord({ key, pn, rn });
        ctx.body = res;
    }
    // mv 搜索
    async searchMvBykeyWord() {
        const { ctx, service } = this;
        const { key, pn = 1, rn = 30 } = ctx.query;
        if (!key) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.search.searchMvBykeyWord({ key, pn, rn });
        ctx.body = res;
    }
    // 歌单搜索
    async searchPlayListBykeyWord() {
        const { ctx, service } = this;
        const { key, pn = 1, rn = 30 } = ctx.query;
        if (!key) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.search.searchPlayListBykeyWord({ key, pn, rn });
        ctx.body = res;
    }
    // 歌手搜索
    async searchArtistBykeyWord() {
        const { ctx, service } = this;
        const { key, pn = 1, rn = 30 } = ctx.query;
        if (!key) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return;
        }
        const res = await service.search.searchArtistBykeyWord({ key, pn, rn });
        ctx.body = res;
    }
}
exports.default = Search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFFbEQsTUFBcUIsTUFBTyxTQUFRLGNBQWM7SUFDaEQsUUFBUTtJQUNSLEtBQUssQ0FBQyxTQUFTO1FBQ2IsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDN0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDekIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMvQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixDQUFDO0lBRUQsT0FBTztJQUNQLEtBQUssQ0FBQyxvQkFBb0I7UUFDeEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDN0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQzFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQTtZQUNELE9BQU07U0FDUDtRQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN0RSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtJQUNoQixD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