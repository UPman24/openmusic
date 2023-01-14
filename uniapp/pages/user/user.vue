<template>
	<view style="width: 100%;">
		<block v-if="!show">
			<view style="width: 100%; height: 1px;"></view>
			<view style="font-size: 22px; font-weight: bold; position: absolute; color: #000000; text-align: center; margin-top: 10%; width: 100%; opacity: 0.5;"></view>
			<image src="@/static/music.png" style="width: 400rpx; height: 400rpx; margin-left: 23%; margin-top: 25%; border-radius: 1000rpx;"></image>
			<view style="font-size: 24px; font-weight: bold; color: #00a9ff; width: 100%; text-align: center; margin-top: 80rpx;">开源音乐 听我所想</view>
			<view class="smallcircle2"></view>
			<view class="bigcircle2"></view>
			<view @click="phoneAndcode" style="width: 90%; height: 100rpx; background:linear-gradient(to right,#65adff,#0092ff); margin-top: 120rpx; border-radius: 100rpx; margin-left: 5%;">
				<view style="font-size: 18px; font-weight: bold; color: #FFFFFF; text-align: center; padding-top: 28rpx;">手机验证码登录</view>
			</view>
			<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 8%; opacity: 0.7;" :class="isYSZCChange?'yszc':''">
				<view @click="YSZC" style="width: 25rpx; height: 25rpx; border: #000000 solid 1px; margin-top: 7rpx; border-radius: 8rpx;">
					<image v-if="isYSZC" src="@/static/yes.png" style="width: 25rpx; height: 25rpx; position: absolute;"></image>
				</view>
				<view style="font-size: 14px; margin-left: 20rpx;">同意《用户许可协议/隐私政策》协议</view>
			</view>
		</block>
		<block v-if="show"></block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isYSZC: false,
				isYSZCChange: false,
				show: true,
			}
		},
		onShow() {
			if(uni.getSystemInfoSync().model == "PC"){
				this.show = true;
			} else {
				this.show = false;
			}
			let user = uni.getStorageSync("username");
			if(user.length == 0){
				uni.setStorageSync("username", "");
			} else {
				uni.reLaunch({
					url: '../index/index'
				})
			}
		},
		methods: {
			YSZC(){
				this.isYSZC = !this.isYSZC;
			},
			phoneAndcode(){
				if(this.isYSZC){
					uni.navigateTo({
						url: './login/login'
					})
				} else {
					this.isYSZCChange = true;
					setTimeout(()=>{
						this.isYSZCChange = false;
					},200)
				}
			},
		}
	}
</script>

<style>
	.smallcircle2{
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
		position: absolute;
		z-index: -1;
		top: 100px;
		left: 90px;
	}
	.smallcircle2::before{
		content: '';
		display: block;
		width: 400rpx;
		height: 400rpx;
		background-color: #00a9ff;
		border-radius: 50%;
		opacity: 0.4;
		animation: scale 1s infinite cubic-bezier(0,0,0.49,1.02);
	}
	@keyframes scale {
		0%{
			transform: scale(0.8);
		}
		50%,75%{
			transform: scale(1.2);
		}
		78%,100%{
			opacity: 0;
		}
	}
	.bigcircle2{
	    width: 400rpx;
		height: 400rpx;
		background-color: #00a9ff;
		opacity: 0.4;
		border-radius: 50%;
		position: absolute;
		z-index: -1;
		top: 100px;
		left: 90px;
		animation: scales 1s infinite cubic-bezier(0,0,0.49,1.02);
	}
	@keyframes scales {
		0%{
			transform: scale(0.5);
		}
		50%,75%{
			transform: scale(2);
		}
		78%,100%{
			opacity: 0;
		}
	}
	.yszc {
		animation: mymove .1s infinite;
		-webkit-animation:mymove .1s infinite; /*Safari and Chrome*/
	}
	@keyframes mymove {
		0% {margin-left: 6%;}
		50%{margin-left: 10%;}
		100% {margin-left: 6%;}
	}
	@-webkit-keyframes mymove {
		0% {margin-left: 6%;}
		50%{margin-left: 10%;}
		100% {margin-left: 6%;}
	}
</style>
