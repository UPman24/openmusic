<template>
	<view>
		<view v-if="platform === 'ios'" :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.8) +'px; background-color: transparent; '" class="playlist"></view>
		<view v-if="platform !== 'ios'" :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.8) +'px; background-color: #747476; '" class="playlist"></view>
		<view style="position: absolute; z-index: 1999; width: 100%;">
			<!-- 顶部播放列表 -->
			<view style="display: flex; flex-direction: row;">
				<block v-if="next1">
					<image src="@/static/music/one_circle.png" style="width: 60rpx; height: 60rpx; opacity: 0.5; margin-top: 20rpx; margin-left: 30rpx;"></image>
					<view style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin-top: 30rpx; margin-left: 20rpx;">单曲循环</view>
				</block>
				<block v-if="next2">
					<image src="@/static/music/luan_play.png" style="width: 60rpx; height: 60rpx; opacity: 0.5; margin-top: 20rpx; margin-left: 30rpx;"></image>
					<view style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin-top: 30rpx; margin-left: 20rpx;">随机播放</view>
				</block>
				<block v-if="next3">
					<image src="@/static/music/next_play.png" style="width: 60rpx; height: 60rpx; opacity: 0.5; margin-top: 20rpx; margin-left: 30rpx;"></image>
					<view style="font-size: 16px; font-weight: bold; color: #FFFFFF; margin-top: 30rpx; margin-left: 20rpx;">顺序播放</view>
				</block>
				<view @click="clearList" style="position: absolute; font-size: 16px; color: #FFFFFF; margin-top: 30rpx; right: 40rpx; opacity: 0.7;">清空列表</view>
			</view>
			<view style="width: 100%; height: 1upx; background-color: #FFFFFF; opacity: 0.4; margin-top: 20rpx;"></view>
			<scroll-view :style="'width: 100%; height: '+ (screenHeight*0.65) +'px; '" :scroll-y="true">
				<block v-for="(list,index) in Music">
					<view style="display: flex; flex-direction: row; margin-top: 1rpx;">
						<view @click="playThis(index)" style="display: flex; flex-direction: row; width: 90%; height: 105rpx;">
							<view v-if="!list.isclick" style="display: flex; flex-direction: row; margin-left: 30rpx; width: 100%;">
								<view style="font-size: 16px; color: #FFFFFF; margin-top: 30rpx; text-align: center; width: 50%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
									{{list.title}}
								</view>
								<view style="font-size: 14px; color: #FFFFFF; margin-top: 30rpx; opacity: 0.7;">-</view>
								<view style="font-size: 16px; color: #FFFFFF; margin-top: 30rpx; opacity: 0.7; text-align: center; width: 48%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
									{{list.author}}
								</view>
							</view>
							<view v-if="list.isclick" style="display: flex; flex-direction: row; margin-left: 30rpx; width: 100%;">
								<view style="font-size: 16px; color: #42C3FE; font-weight: bold; margin-top: 30rpx; text-align: center; width: 50%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
									{{list.title}}
								</view>
								<view style="font-size: 14px; color: #42C3FE; font-weight: bold; margin-top: 30rpx; opacity: 0.7;">-</view>
								<view style="font-size: 16px; color: #42C3FE; font-weight: bold; margin-top: 30rpx; opacity: 0.7; text-align: center; width: 48%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
									{{list.author}}
								</view>
							</view>
						</view>
						<image @click="deleteMusic(index)" src="@/static/content/close.png" style="width: 50rpx; height: 50rpx; opacity: 0.6; margin-top: 30rpx; margin-left: 5rpx;"></image>
					</view>
					<view style="width: 100%; height: 1upx; background-color: #FFFFFF; opacity: 0.4;"></view>
				</block>
			</scroll-view>
			<!-- 底部关闭 -->
			<view @click="close" style="position: fixed; bottom: 0; width: 100%; height: 140rpx;">
				<view style="width: 100%; height: 1upx; background-color: #FFFFFF; opacity: 0.4;"></view>
				<view style="font-size: 16px; color: #FFFFFF; text-align: center; padding-top: 40rpx;">关闭</view>
			</view>
		</view>
		<uni-popup type="center" ref="msga">
			<view style="width: 100%;">
				<view style="font-size: 14px; color: #FFFFFF;">请稍等...</view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="msg2">
			<view style="width: 420rpx; height: 300rpx; margin-top: -400rpx; border-radius: 10rpx; background-color: #FFFFFF;">
				<view style="font-size: 18px; font-weight: bold; text-align: center; padding-top: 20rpx;">提醒信息</view>
				<view style="font-size: 14px; text-align: center; padding-top: 50rpx;">清空后请重新添加音乐</view>
				<view style="display: flex; flex-direction: row; margin-top: 70rpx;">
					<view @click="quxiaomsg2" style="font-size: 16px; font-weight: bold; color: #999999; margin-left: 95rpx;">取消</view>
					<view @click="deleteAll" style="font-size: 16px; font-weight: bold; color: #007AFF; margin-left: 95rpx;">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"playlist",
		data() {
			return {
				windowWidth: 0,
				screenHeight: 0,
				
				Music: [],
				next1: true,
				next2: false,
				next3: false,
				
				platform: ""
			};
		},
		created() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			this.platform = uni.getSystemInfoSync().platform;
			let music = uni.getStorageSync('music');
			if(music.length == 0){
				uni.setStorageSync('music', []);
			} else {
				this.Music = music;
			}
			this.next1 = uni.getStorageSync("next").next1;
			this.next2 = uni.getStorageSync("next").next2;
			this.next3 = uni.getStorageSync("next").next3;
			uni.$on('playlist_update', ()=>{
				let music = uni.getStorageSync('music');
				if(music.length == 0){
					uni.setStorageSync('music', []);
				} else {
					this.Music = music;
				}
			})
		},
		methods:{
			playThis(index){
				this.$refs.msga.open('center');
				uni.request({
					url: this.Music[index].pre_url,
					method: 'GET',
					success: (res) => {
						let data = res.data.data;
						this.Music[index].url = data.url;
						this.$musicInfo.author = this.Music[index].author;
						this.$musicInfo.lrc = this.Music[index].lrc;
						this.$musicInfo.pic = this.Music[index].pic;
						this.$musicInfo.pre_url = this.Music[index].pre_url;
						this.$musicInfo.title = this.Music[index].title;
						this.$musicInfo.url = this.Music[index].url;
						// #ifdef APP
						if(this.platform !== 'ios'){
							uni.downloadFile({
								url: this.$musicInfo.url,
								success: (es) => {
									if (es.statusCode === 200) {
										uni.getSavedFileList({
											success: (ares)=> {
												let Lis = ares.fileList;
												for(let k=0;k<Lis.length;k++){
													uni.removeSavedFile({
														filePath: Lis[k].filePath
													});
												}
												setTimeout(()=>{
													uni.saveFile({
														tempFilePath: es.tempFilePath,
														success: (req)=> {
															this.$refs.msga.close();
															var savedFilePath = req.savedFilePath;
															uni.$emit('update_image');
															this.$audio.src = savedFilePath;
															this.$audio.play();
														}
													});
												},200)
											}
										})
									}
								}
							});
						} else {
							// ios 端
							this.$refs.msga.close();
							this.$audio.src = this.$musicInfo.url;
							this.$audio.play();
						}
						// #endif
						// #ifdef H5
						if(this.platform !== 'ios'){
							uni.$emit('update_image');
						}
						this.$refs.msga.close();
						this.$audio.src = this.$musicInfo.url;
						this.$audio.play();
						// #endif
						let music = uni.getStorageSync('music');
						for(let i=0;i<music.length;i++){
							music[i].isclick = false;
						}
						music[index].isclick = true;
						uni.setStorageSync('music', music);
						uni.$emit('popshows', {
							ispop: true
						})
						uni.$emit('updateTabbar')
						uni.$emit('info', {
							author: this.Music[index].author,
							lrc: this.Music[index].lrc,
							pic: this.Music[index].pic,
							pre_url: this.Music[index].pre_url,
							title: this.Music[index].title,
							url: this.Music[index].url
						})
						this.Music = music;
					}
				})
				
			},
			deleteMusic(index){
				var list = [];
				for(let i=0;i<this.Music.length;i++){
					if(i !== index){
						list.push(this.Music[i])
					}
				}
				uni.setStorageSync('music', list);
				this.Music = list;
			},
			close(){
				uni.$emit('close_playlist')
			},
			clearList(){
				this.$refs.msg2.open('center');
			},
			deleteAll(){
				var list = [];
				uni.setStorageSync('music', list);
				uni.$emit('close_playlist')
			},
			quxiaomsg2(){
				this.$refs.msg2.close();
			}
		}
	}
</script>

<style>
	/* 控制滚动条不出现 */
	/deep/::-webkit-scrollbar {
		 display: none;
		 width: 0;
		 height: 0;
	}
	.playlist {
		width: 100%;
		position: absolute;
	}
	.playlist::before {
		content: "";
		position: absolute; /* 一定要用绝对定位 */
		width: 100%;
		height: 100%;
		backdrop-filter: blur(40px); /* 模糊半径 */
	}
</style>
