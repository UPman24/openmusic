"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class Banner extends BaseController {
    async index() {
        const { ctx, service } = this;
        const res = await service.banner.List();
        ctx.body = res;
    }
}
exports.default = Banner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFFbEQsTUFBcUIsTUFBTyxTQUFRLGNBQWM7SUFDaEQsS0FBSyxDQUFDLEtBQUs7UUFDVCxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDdkMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUE7SUFDaEIsQ0FBQztDQUNGO0FBTkQseUJBTUMifQ==