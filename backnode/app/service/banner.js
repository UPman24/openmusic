"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Banner extends BaseService {
    async List() {
        return this.commonRequest('http://www.kuwo.cn/api/www/banner/index/bannerList?&httpsStatus=1');
    }
}
exports.default = Banner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLE1BQU8sU0FBUSxXQUFXO0lBQzdDLEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG1FQUFtRSxDQUFDLENBQUE7SUFDaEcsQ0FBQztDQUNGO0FBSkQseUJBSUMifQ==