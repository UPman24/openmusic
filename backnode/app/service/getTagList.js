"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class TagList extends BaseService {
    async index() {
        return this.commonRequest('http://www.kuwo.cn/api/www/playlist/getTagList?&httpsStatus=1');
    }
}
exports.default = TagList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFnTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRhZ0xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFNUMsTUFBcUIsT0FBUSxTQUFRLFdBQVc7SUFDOUMsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsK0RBQStELENBQUMsQ0FBQTtJQUM1RixDQUFDO0NBQ0Y7QUFKRCwwQkFJQyJ9