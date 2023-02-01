"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class Momment extends BaseController {
    /**
     *  @param {string}  type 评论类型     [热门评论  get_rec_comment , 最新评论  get_comment]
     *  @param {number}   digest          15 歌曲  2  排行榜  8 歌单评论  7  mv评论
     */
    async index() {
        const { ctx, service } = this;
        const { sid, page = 1, rows = 30, uid = 0, type = 'get_rec_comment', digest = 15 } = ctx.query;
        if (!sid) {
            ctx.body = {
                code: 500,
                message: '参数错误',
                result: null,
                success: false,
            };
            return false;
        }
        const res = await service.comment.List({ sid, page, rows, uid, type, digest });
        ctx.body = res;
    }
}
exports.default = Momment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtBQUVsRCxNQUFxQixPQUFRLFNBQVEsY0FBYztJQUNqRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBRTdCLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLGlCQUFpQixFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBRTlGLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQTtZQUNELE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzlFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQ2hCLENBQUM7Q0FDRjtBQXZCRCwwQkF1QkMifQ==