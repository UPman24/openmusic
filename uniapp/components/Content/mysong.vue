<template>
	<view>
		<!-- #ifdef APP -->
		<view style="width: 100%; height: 80rpx; background-color: transparent;"></view>
		<!-- #endif -->
		<view style="width: 100%;">
			<view style="display: flex; flex-direction: row;">
				<image @click="close" src="@/static/content/mysong/back.png" style="width: 45rpx; height: 45rpx; margin-top: 40rpx; margin-left: 6%;"></image>
				<view @click="close" style="font-size: 16px; color: #FFFFFF; margin-top: 39rpx; margin-left: 20rpx;">返回</view>
				<view style="font-size: 18px; font-weight: bold; color: #FFFFFF; margin-top: 38rpx; margin-left: 19.5%;">缓存歌曲</view>
			</view>
		</view>
		<scroll-view :style="'width: 100%; height: '+ (screenHeight*0.88) +'px; margin-top: 20rpx;'" :scroll-y="true">
			<block v-if="Music.length == 0">
				<view style="font-size: 16px; color: #FFFFFF; text-align: center; opacity: 0.7; padding-top: 250rpx;">空空如也 ～</view>
			</block>
			<block v-for="(list,index) in Music">
				<view style="width: 100%; display: flex; flex-direction: row; margin-top: 50rpx; margin-left: 6%;">
					<image @click="playThis(index)" :src="list.pic" mode="aspectFill" style="width: 110rpx; height: 110rpx; border-radius: 10rpx;"></image>
					<view @click="playThis(index)" style="display: flex; flex-direction: column; width: 60%; margin-left: 30rpx;">
						<view style="width: 90%; font-size: 18px; font-weight: bold; color: #FFFFFF; margin-top: 10rpx; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
							{{list.title}}
						</view>
						<view style="width: 90%; font-size: 14px; color: #FFFFFF; margin-top: 10rpx; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
							{{list.author}}
						</view>
					</view>
					<image @click="deleteMusic(index)" src="@/static/content/mysong/delete.png" style="width: 55rpx; height: 55rpx; margin-top: 30rpx; margin-left: 30rpx; opacity: 0.5;"></image>
				</view>
			</block>
			<view style="width: 100%; height: 500rpx;"></view>
		</scroll-view>
		<uni-popup type="center" ref="msg">
			<view style="width: 100%;">
				<view style="font-size: 14px; color: #FFFFFF;">请稍等...</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"mysong",
		data() {
			return {
				screenHeight: 0,
				Music: [],
				
				platform: "",
			};
		},
		created() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.platform = uni.getSystemInfoSync().platform;
			let music = uni.getStorageSync('music');
			if(music.length == 0){
				uni.setStorageSync('music', []);
			} else {
				this.Music = music;
			}
		},
		methods:{
			playThis(index){
				this.$refs.msg.open('center');
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
															this.$refs.msg.close();
															var savedFilePath = req.savedFilePath;
															this.$audio.src = savedFilePath;
															this.$audio.play();
															uni.$emit('popshows', {
																ispop: true
															})
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
							this.$refs.msg.close();
							this.$audio.src = this.$musicInfo.url;
							this.$audio.play();
							uni.$emit('popshows', {
								ispop: true
							})
						}
						// #endif
						// #ifdef H5
						this.$refs.msg.close();
						this.$audio.src = this.$musicInfo.url;
						this.$audio.play();
						// #endif
						this.author = this.$musicInfo.author;
						this.lrc = this.$musicInfo.lrc;
						this.pic = this.$musicInfo.pic;
						this.pre_url = this.$musicInfo.pre_url;
						this.title = this.$musicInfo.title;
						this.url = this.$musicInfo.url;
						let music = uni.getStorageSync('music');
						for(let i=0;i<music.length;i++){
							music[i].isclick = false;
						}
						music[index].isclick = true;
						uni.setStorageSync('music', music);
						uni.$emit('updateTabbar');
						// #ifdef APP
						if(this.platform !== 'ios'){
							setTimeout(()=>{
								uni.$emit('info', {
									author: this.Music[index].author,
									lrc: this.Music[index].lrc,
									pic: this.Music[index].pic,
									pre_url: this.Music[index].pre_url,
									title: this.Music[index].title,
									url: this.Music[index].url
								})
							},500)
						} else {
							uni.$emit('info', {
								author: this.Music[index].author,
								lrc: this.Music[index].lrc,
								pic: this.Music[index].pic,
								pre_url: this.Music[index].pre_url,
								title: this.Music[index].title,
								url: this.Music[index].url
							})
						}
						// #endif
						// #ifdef H5
						uni.$emit('popshows', {
							ispop: true
						})
						uni.$emit('info', {
							author: this.Music[index].author,
							lrc: this.Music[index].lrc,
							pic: this.Music[index].pic,
							pre_url: this.Music[index].pre_url,
							title: this.Music[index].title,
							url: this.Music[index].url
						})
						// #endif
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
				uni.$emit('close_mysong', {
					ismysong: true
				})
				uni.$emit('updateTabbar')
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
</style>
