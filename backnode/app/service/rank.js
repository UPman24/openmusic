"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Rank extends BaseService {
    // 榜单
    async index() {
        return this.commonRequest('http://www.kuwo.cn/api/www/bang/bang/bangMenu?&httpsStatus=1');
    }
    // 排行榜音乐
    async getRankMusicList({ bangId, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=${bangId}&pn=${pn}&rn=${rn}&httpsStatus=1`, {
            headers: {
                Referer: 'http://www.kuwo.cn/rankList',
            },
        });
    }
    // 推荐榜单 --首页
    async getRecBangList() {
        return this.commonRequest('http://www.kuwo.cn/api/www/bang/index/bangList?&httpsStatus=1', {
            headers: {
                Referer: 'http://www.kuwo.cn/rankList',
            },
        });
    }
}
exports.default = Rank;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFNUMsTUFBcUIsSUFBSyxTQUFRLFdBQVc7SUFDM0MsS0FBSztJQUNMLEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLDhEQUE4RCxDQUFDLENBQUE7SUFDM0YsQ0FBQztJQUVELFFBQVE7SUFDUixLQUFLLENBQUMsZ0JBQWdCLENBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN4QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMseURBQXlELE1BQU0sT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTtZQUMzSCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLDZCQUE2QjthQUN2QztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxZQUFZO0lBQ1osS0FBSyxDQUFDLGNBQWM7UUFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLCtEQUErRCxFQUFFO1lBQ3pGLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsNkJBQTZCO2FBQ3ZDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBdkJELHVCQXVCQyJ9