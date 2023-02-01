"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class AlbumInfo extends BaseService {
    async getList({ albumId, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/album/albumInfo?albumId=${albumId}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
}
exports.default = AlbumInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxidW1JbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxidW1JbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLFNBQVUsU0FBUSxXQUFXO0lBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsc0RBQXNELE9BQU8sT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzVILENBQUM7Q0FDRjtBQUpELDRCQUlDIn0=