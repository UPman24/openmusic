"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    // 轮播图
    router.get('/kuwo/banner', controller.banner.index);
    // 评论
    router.get('/kuwo/comment', controller.comment.index);
    // 歌词
    router.get('/kuwo/lrc', controller.lrc.index);
    // 音乐信息
    router.get('/kuwo/musicInfo', controller.musicInfo.index);
    // 歌单音乐
    router.get('/kuwo/musicList', controller.musicList.index);
    // 音乐播放地址
    router.get('/kuwo/url', controller.playUrl.index);
    // 获取 mv 播放地址
    router.get('/kuwo/mv_url', controller.mv.getMvUrl);
    // 获取电台列表
    router.get('/kuwo/radio', controller.radio.index);
    // 获取歌手信息
    router.get('/kuwo/singer', controller.singer.getArtistInfo);
    // 获取歌手单曲
    router.get('/kuwo/singer/music', controller.singer.getArtistMusic);
    // 获取歌手专辑
    router.get('/kuwo/singer/album', controller.singer.getArtistAlbum);
    // 获取歌手mv
    router.get('/kuwo/singer/mv', controller.singer.getArtistMv);
    // 排行榜
    router.get('/kuwo/rank', controller.rank.index);
    // 排行榜音乐
    router.get('/kuwo/rank/musicList', controller.rank.rankMusicList);
    // 推荐榜单
    router.get('/kuwo/rank/rec_bangList', controller.rank.rankRecBangList);
    // 推荐歌单
    router.get('/kuwo/rec_gedan', controller.recGedan.index);
    // 推荐歌手
    router.get('/kuwo/rec_singer', controller.recSinger.index);
    // 歌单分类
    router.get('/kuwo/getTagList', controller.getTagList.index);
    // 默认歌单
    router.get('/kuwo/playList', controller.playList.index);
    // 专辑歌单
    router.get('/kuwo/albumInfo', controller.albumInfo.index);
    // 歌单分类
    router.get('/kuwo/playList/getTagPlayList', controller.playList.getTagPlayList);
    // 关键字搜索
    router.get('/kuwo/search/searchKey', controller.search.searchKey);
    // 单曲搜索
    router.get('/kuwo/search/searchMusicBykeyWord', controller.search.searchMusicBykeyWord);
    // 专辑搜索
    router.get('/kuwo/search/searchAlbumBykeyWord', controller.search.searchAlbumBykeyWord);
    // mv 搜索
    router.get('/kuwo/search/searchMvBykeyWord', controller.search.searchMvBykeyWord);
    // 歌单搜索
    router.get('/kuwo/search/searchPlayListBykeyWord', controller.search.searchPlayListBykeyWord);
    // 歌手搜索
    router.get('/kuwo/search/searchArtistBykeyWord', controller.search.searchArtistBykeyWord);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDbEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDbEMsTUFBTTtJQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkQsS0FBSztJQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckQsS0FBSztJQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDN0MsT0FBTztJQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN6RCxPQUFPO0lBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pELFNBQVM7SUFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELGFBQWE7SUFDYixNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2xELFNBQVM7SUFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELFNBQVM7SUFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLGFB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