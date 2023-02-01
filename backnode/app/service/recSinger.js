"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class RecSinger extends BaseService {
    async index({ category, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
}
exports.default = RecSinger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjU2luZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVjU2luZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLFNBQVUsU0FBUSxXQUFXO0lBQ2hELEtBQUssQ0FBQyxLQUFLLENBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMseURBQXlELFFBQVEsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ2hJLENBQUM7Q0FDRjtBQUpELDRCQUlDIn0=