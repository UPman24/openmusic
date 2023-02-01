"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Comment extends BaseService {
    async List({ sid, page, rows, uid, type, digest }) {
        const targetUrl = `http://www.kuwo.cn/comment?type=${type}&f=web&page=${page}&rows=${rows}&digest=${digest}&sid=${sid}&uid=${uid}&prod=newWeb&httpsStatus=1`;
        let Ref = '';
        switch (digest) {
            case 15:
                return Ref = 'http://www.kuwo.cn/play_detail/' + encodeURIComponent(sid);
            case 7:
                return Ref = 'http://www.kuwo.cn/mvplay/' + encodeURIComponent(sid);
            case 8:
                return Ref = 'http://www.kuwo.cn/playlist_detail/' + encodeURIComponent(sid);
            case 2:
                return Ref = 'http://www.kuwo.cn/rankList';
        }
        return this.commonRequest(targetUrl, {
            headers: {
                Referer: Ref,
            },
        });
    }
}
exports.default = Comment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFNUMsTUFBcUIsT0FBUSxTQUFRLFdBQVc7SUFDOUMsS0FBSyxDQUFDLElBQUksQ0FBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ2hELE1BQU0sU0FBUyxHQUFHLG1DQUFtQyxJQUFJLGVBQWUsSUFBSSxTQUFTLElBQUksV0FBVyxNQUFNLFFBQVEsR0FBRyxRQUFRLEdBQUcsNEJBQTRCLENBQUE7UUFFNUosSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxHQUFHLEdBQUcsaUNBQWlDLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDMUUsS0FBSyxDQUFDO2dCQUNKLE9BQU8sR0FBRyxHQUFHLDRCQUE0QixHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3JFLEtBQUssQ0FBQztnQkFDSixPQUFPLEdBQUcsR0FBRyxxQ0FBcUMsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM5RSxLQUFLLENBQUM7Z0JBQ0osT0FBTyxHQUFHLEdBQUcsNkJBQTZCLENBQUE7U0FDN0M7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQ25DLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsR0FBRzthQUNiO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBdEJELDBCQXNCQyJ9