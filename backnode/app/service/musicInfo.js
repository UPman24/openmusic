"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class MusicInfo extends BaseService {
    async getList(mid) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/music/musicInfo?mid=${mid}&httpsStatus=1`);
    }
}
exports.default = MusicInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzaWNJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVzaWNJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLFNBQVUsU0FBUSxXQUFXO0lBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUUsR0FBRztRQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsa0RBQWtELEdBQUcsZ0JBQWdCLENBQUMsQ0FBQTtJQUNsRyxDQUFDO0NBQ0Y7QUFKRCw0QkFJQyJ9