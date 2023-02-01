"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class PlayUrl extends BaseService {
    async getPlayUrl(mid, br = '128kmp3') {
        return this.commonRequest(`http://www.kuwo.cn/api/v1/www/music/playUrl?mid=${mid}&type=convert_url3&br=${br}`);
    }
}
exports.default = PlayUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheVVybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXlVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFNUMsTUFBcUIsT0FBUSxTQUFRLFdBQVc7SUFDOUMsS0FBSyxDQUFDLFVBQVUsQ0FBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLFNBQVM7UUFDbkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG1EQUFtRCxHQUFHLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2hILENBQUM7Q0FDRjtBQUpELDBCQUlDIn0=