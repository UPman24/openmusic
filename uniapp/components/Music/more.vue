<template>
	<view>
		<view v-if="platform === 'ios'" :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.22) +'px; background-color: transparent; '" class="playlist"></view>
		<view v-if="platform !== 'ios'" :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.22) +'px; background-color: #747476; '" class="playlist"></view>
		<view style="position: absolute; z-index: 1998; width: 100%;">
			<view @click="catAuthor" style="display: flex; flex-direction: row;">
				<image src="@/static/content/people.png" style="width: 70rpx; height: 70rpx; margin-top: 20rpx; margin-left: 30rpx; opacity: 0.5;"></image>
				<view style="font-size: 16px; color: #FFFFFF; margin-top: 32rpx; margin-left: 30rpx; opacity: 0.6;">查看歌手信息</view>
			</view>
			<view @click="catMusic" style="display: flex; flex-direction: row; margin-top: 10rpx;">
				<image src="@/static/content/music.png" style="width: 70rpx; height: 70rpx; margin-top: 20rpx; margin-left: 30rpx; opacity: 0.5;"></image>
				<view style="font-size: 16px; color: #FFFFFF; margin-top: 32rpx; margin-left: 30rpx; opacity: 0.6;">查看歌曲信息</view>
			</view>
			<!-- 底部关闭 -->
			<view @click="close" style="position: fixed; bottom: 0; width: 100%; height: 140rpx;">
				<view style="width: 100%; height: 1upx; background-color: #FFFFFF; opacity: 0.4;"></view>
				<view style="font-size: 16px; color: #FFFFFF; text-align: center; padding-top: 40rpx;">关闭</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "more",
		data() {
			return {
				screenHeight: 0,
				windowWidth: 0,
				
				platform: ""
			};
		},
		created() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			this.platform = uni.getSystemInfoSync().platform;
		},
		methods: {
			catMusic(){
				uni.navigateTo({
					url: '../../pages/index/webview/webview?src=' + 'https://www.baidu.com/s?wd=' + encodeURIComponent( this.$musicInfo.title )
				})
			},
			catAuthor(){
				// console.log(this.$musicInfo.author);
				uni.navigateTo({
					url: '../../pages/index/webview/webview?src=' + 'https://www.baidu.com/s?wd=' + encodeURIComponent( this.$musicInfo.author )
				})
			},
			close(){
				uni.$emit('close_more');
			}
		}
	}
</script>

<style>
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
