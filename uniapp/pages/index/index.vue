<template>
	<view>
		<!-- 手机版本 -->
		<block v-if="!show">
			<!-- 背景页面 -->
			<background>
				<!-- #ifdef APP -->
				<view style="width: 100%; height: 80rpx; background-color: #252425;"></view>
				<!-- #endif -->
				<!-- #ifdef APP -->
				<!-- 中间内容区域 -->
				<Content :style="'width: '+ windowWidth +'px; height: '+ (screenHeight - safearea)*0.95 +'px; background-color: #252425; '"></Content>
				<!-- #endif -->
				<!-- #ifndef APP -->
				<Content :style="'width: '+ windowWidth +'px; height: '+ (screenHeight)*0.95 +'px; background-color: #252425; '"></Content>
				<!-- #endif -->
				<!-- tabbar 就是歌曲栏 -->
				<tabbar :class="(showTab)?'ani':'close'" style="position: fixed; bottom: 50rpx; z-index: 1000;"></tabbar>
				<!-- #ifdef APP -->
				<view :class="(showTab)?'ani':'close'" :style="'width: 100%; height: '+ safearea +'px; background-color: #252425; position: fixed; bottom: 0; z-index: 999;'"></view>
				<!-- #endif -->
				<!-- #ifndef APP -->
				<view :class="(showTab)?'ani':'close'" :style="'width: 100%; height: 90rpx; background-color: #252425; position: fixed; bottom: 0; z-index: 999;'"></view>
				<!-- #endif -->
			</background>
		</block>
		<!-- 电脑版本 -->
		<block v-if="show">
			<view :style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px;'" class="bady">
				<view style="width: 100%; height: 1rpx;"></view>
				<view style="width: 1250px; height: 650px; background-color: #252425; margin-top: 30px; margin-left: 90px; border-radius: 20px;">
					<PC :Width="1250" :Height="650"></PC>
				</view>
			</view>
		</block>
		<uni-popup type="bottom" ref="music" @maskClick="maskClick">
			<!-- #ifdef APP -->
			<view :style="'width: '+ windowWidth +'px; height: '+ screenHeight +'px;'">
				<!-- 音乐界面 -->
				<Music></Music>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.82) +'px;'">
				<!-- 音乐界面 -->
				<Music></Music>
			</view>
			<!-- #endif -->
		</uni-popup>
	</view>
</template>

<script>
	import background from '@/components/background/background.vue';
	import Content from '@/components/Content/Content.vue';
	import tabbar from '@/components/tabbar/tabbar.vue';
	import Music from '@/components/Music/Music.vue';
	import PC from '@/components/PC/PC.vue';
	export default {
		data() {
			return {
				show: false,
				windowWidth: 0,
				windowHeight: 0,
				screenHeight: 0,
				showTab: true,
				safearea: 0,
				platform: ""
			}
		},
		components:{
			background,Content,tabbar,Music,PC
		},
		onShow() {
			let user = uni.getStorageSync("username");
			if(user.length == 0){
				uni.setStorageSync("username", "");
				uni.reLaunch({
					url: '../user/user'
				})
			}
			uni.$on('popshows', (data)=>{
				if(data.ispop === true){
					this.showTab = false
					this.$refs.music.open('bottom')
				}
				if(data.ispop === false){
					this.$refs.music.close()
					this.showTab = true
				}
			})
			const windowResizeCallback = (res) => {
				this.windowWidth = res.size.windowWidth;
				this.windowHeight = res.size.windowHeight;
			}
			uni.onWindowResize(windowResizeCallback)
		},
		onHide() {
			uni.$off('popshows');
		},
		onLoad() {
			this.platform = uni.getSystemInfoSync().platform;
			if(uni.getSystemInfoSync().model == "PC"){
				this.show = true;
			} else {
				this.show = false;
			}
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			// #ifdef APP
			this.safearea = uni.getSystemInfoSync().safeArea.top;
			// #endif
			setTimeout(()=>{
				if(this.$musicInfo.pre_url.length !== 0){
					uni.request({
						url: this.$musicInfo.pre_url,
						method: 'GET',
						success: (res) => {
							let data = res.data.data;
							this.$musicInfo.url = data.url;
							// #ifdef APP
							if(this.platform !== 'ios'){
								uni.showLoading({
									title: 'loading...'
								})
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
																uni.hideLoading();
																var savedFilePath = req.savedFilePath;
																this.$audio.src = savedFilePath;
																this.$audio.pause();
															}
														});
													},200)
												}
											})
										}
									}
								});
								setTimeout(()=>{
									uni.hideLoading();
								},3000)
							} else {
								// ios 端
								this.$audio.src = this.$musicInfo.url;
								this.$audio.pause();
							}
							// #endif
							// #ifdef H5
							this.$audio.src = this.$musicInfo.url;
							this.$audio.pause();
							// #endif
						}
					})
				}
			},500)
		},
		methods: {
			maskClick(){
				uni.$emit('popshows',{
					ispop: false
				})
			}
		}
	}
</script>

<style>
	.bady {
		background-color: #141414;
	}
	.ani {
		animation: anima .5s;
	}
	.close {
		animation: anitui .5s;
		animation-fill-mode: both;
	}
	@keyframes anitui {
		0% {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			opacity: 1;
			-webkit-transform: translateY(120px);
			transform: translateY(120px);
		}
	}
	@keyframes anima {
		0% {
			opacity: 1;
			-webkit-transform: translateY(120px);
			transform: translateY(120px);
		}
		100% {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
	}
</style>
