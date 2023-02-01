"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Lrc extends BaseService {
    async LrcRes(musicId) {
        return this.commonRequest(`http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${musicId}&httpsStatus=1`);
    }
}
exports.default = Lrc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHJjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibHJjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLEdBQUksU0FBUSxXQUFXO0lBQzFDLEtBQUssQ0FBQyxNQUFNLENBQUUsT0FBTztRQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMseURBQXlELE9BQU8sZ0JBQWdCLENBQUMsQ0FBQTtJQUM3RyxDQUFDO0NBQ0Y7QUFKRCxzQkFJQyJ9