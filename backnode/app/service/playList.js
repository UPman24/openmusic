"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class PlayList extends BaseService {
    async index({ order, rn, pn }) {
        return await this.commonRequest(`http://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList?pn=${pn}&rn=${rn}&order${order}&httpsStatus=1`);
    }
    // 歌单分类
    async getTagPlayList({ id, rn, pn }) {
        return await this.commonRequest(`http://www.kuwo.cn/api/www/classify/playlist/getTagPlayList?pn=${pn}&rn=${rn}&id=${id}&httpsStatus=1`, {
            headers: {
                Referer: 'http://www.kuwo.cn/playlists',
            },
        });
    }
}
exports.default = PlayList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUU1QyxNQUFxQixRQUFTLFNBQVEsV0FBVztJQUMvQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDNUIsT0FBTyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsa0VBQWtFLEVBQUUsT0FBTyxFQUFFLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzlJLENBQUM7SUFFRCxPQUFPO0lBQ1AsS0FBSyxDQUFDLGNBQWMsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGtFQUFrRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUU7WUFDdEksT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSw4QkFBOEI7YUFDeEM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFiRCwyQkFhQyJ9