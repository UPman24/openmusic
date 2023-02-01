"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class MusicList extends BaseService {
    async getList({ pid, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/playlist/playListInfo?pid=${pid}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
}
exports.default = MusicList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWNMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVzaWNMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLFNBQVUsU0FBUSxXQUFXO0lBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUM1QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsd0RBQXdELEdBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzFILENBQUM7Q0FDRjtBQUpELDRCQUlDIn0=