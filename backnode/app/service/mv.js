"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Mv extends BaseService {
    async getMvUrl(rid) {
        const res = await this.commonRequest(`http://www.kuwo.cn/url?rid=${rid}&response=url&format=mp4%7Cmkv&type=convert_url&t=${Date.now()}&httpsStatus=1`, {
            headers: {
                Referer: 'http://www.kuwo.cn/mvs',
            },
            dataType: 'text',
        });
        return {
            code: 200,
            msg: 'success',
            url: res,
        };
    }
}
exports.default = Mv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUU1QyxNQUFxQixFQUFHLFNBQVEsV0FBVztJQUN6QyxLQUFLLENBQUMsUUFBUSxDQUFFLEdBQUc7UUFDakIsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLDhCQUE4QixHQUFHLHFEQUFxRCxJQUFJLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFO1lBQ3JKLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsd0JBQXdCO2FBQ2xDO1lBQ0QsUUFBUSxFQUFFLE1BQU07U0FDakIsQ0FBQyxDQUFBO1FBQ0YsT0FBTztZQUNMLElBQUksRUFBRSxHQUFHO1lBQ1QsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsR0FBRztTQUNULENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFkRCxxQkFjQyJ9