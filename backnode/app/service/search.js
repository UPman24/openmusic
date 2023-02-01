"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService = require('./BaseService');
class Search extends BaseService {
    // 关键字搜索
    async searchKey(key) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchKey?key=${key}&httpsStatus=1`);
    }
    // 单曲搜索
    async searchMusicBykeyWord({ key, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
    // 专辑搜索
    async searchAlbumBykeyWord({ key, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchAlbumBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
    // mv 搜索
    async searchMvBykeyWord({ key, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchMvBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
    // 歌单搜索
    async searchPlayListBykeyWord({ key, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchPlayListBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
    // 歌手搜索
    async searchArtistBykeyWord({ key, pn, rn }) {
        return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchArtistBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`);
    }
}
exports.default = Search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRTVDLE1BQXFCLE1BQU8sU0FBUSxXQUFXO0lBQzdDLFFBQVE7SUFDUixLQUFLLENBQUMsU0FBUyxDQUFFLEdBQUc7UUFDbEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG1EQUFtRCxHQUFHLGdCQUFnQixDQUFDLENBQUE7SUFDbkcsQ0FBQztJQUVELE9BQU87SUFDUCxLQUFLLENBQUMsb0JBQW9CLENBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsOERBQThELEdBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ2hJLENBQUM7SUFFRCxPQUFPO0lBQ1AsS0FBSyxDQUFDLG9CQUFvQixDQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDekMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLDhEQUE4RCxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUNoSSxDQUFDO0lBRUQsUUFBUTtJQUNSLEtBQUssQ0FBQyxpQkFBaUIsQ0FBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQywyREFBMkQsR0FBRyxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFDN0gsQ0FBQztJQUVELE9BQU87SUFDUCxLQUFLLENBQUMsdUJBQXVCLENBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsaUVBQWlFLEdBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ25JLENBQUM7SUFFRCxPQUFPO0lBQ1AsS0FBSyxDQUFDLHFCQUFxQixDQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDMUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLCtEQUErRCxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUNqSSxDQUFDO0NBQ0Y7QUE5QkQseUJBOEJDIn0=