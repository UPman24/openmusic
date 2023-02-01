"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Radio extends BaseService {
    async getRadio() {
        return this.commonRequest('http://www.kuwo.cn/api/www/radio/index/radioList?&httpsStatus=1', {
            headers: {
                Referer: 'http://www.kuwo.cn/rankList',
            },
        });
    }
}
exports.default = Radio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUU1QyxNQUFxQixLQUFNLFNBQVEsV0FBVztJQUM1QyxLQUFLLENBQUMsUUFBUTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxpRUFBaUUsRUFBRTtZQUMzRixPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLDZCQUE2QjthQUN2QztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQVJELHdCQVFDIn0=