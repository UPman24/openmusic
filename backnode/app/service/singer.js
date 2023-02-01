"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Artist extends BaseService {
    // 获取歌手
    async getArtistInfo({ category, rn, pn, prefix }) {
        return this.commonRequest(prefix
            ? `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&prefix=${prefix}&httpsStatus=1`
            : `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&httpsStatus=1`, {
            headers: {
                Referer: prefix ? 'http://www.kuwo.cn/singers' : undefined,
            },
        });
    }
    // 获取歌手单曲
    async getArtistMusic({ artistid, rn, pn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistMusic?artistid=${artistid}&rn=${rn}&pn=${pn}&httpsStatus=1`, {
            headers: {
                Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid),
            },
        });
    }
    // 获取歌手专辑
    async getArtistAlbum({ artistid, rn, pn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistAlbum?artistid=${artistid}&rn=${rn}&pn=${pn}&httpsStatus=1`, {
            headers: {
                Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid) + '/album',
            },
        });
    }
    // 获取歌手mv
    async getArtistMv({ artistid, rn, pn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistMv?artistid=${artistid}&rn=${rn}&pn=${pn}&httpsStatus=1`, {
            headers: {
                Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid) + '/mv',
            },
        });
    }
}
exports.default = Artist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLE1BQU8sU0FBUSxXQUFXO0lBQzdDLE9BQU87SUFDUCxLQUFLLENBQUMsYUFBYSxDQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFO1FBQy9DLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FDdkIsTUFBTTtZQUNKLENBQUMsQ0FBQyx5REFBeUQsUUFBUSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsTUFBTSxnQkFBZ0I7WUFDdEgsQ0FBQyxDQUFDLHlEQUF5RCxRQUFRLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUU7WUFDdkcsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQzNEO1NBQ0YsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELFNBQVM7SUFDVCxLQUFLLENBQUMsY0FBYyxDQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDeEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLDBEQUEwRCxRQUFRLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUU7WUFDOUgsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSxtQ0FBbUMsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7YUFDNUU7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsU0FBUztJQUVULEtBQUssQ0FBQyxjQUFjLENBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN4QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsMERBQTBELFFBQVEsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTtZQUM5SCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLG1DQUFtQyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVE7YUFDdkY7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsU0FBUztJQUNULEtBQUssQ0FBQyxXQUFXLENBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNyQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsdURBQXVELFFBQVEsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTtZQUMzSCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLG1DQUFtQyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUs7YUFDcEY7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUF4Q0QseUJBd0NDIn0=