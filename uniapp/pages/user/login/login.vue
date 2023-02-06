<template>
	<view>
		<view style="font-size: 18px; font-weight: bold; margin-top: 60upx; margin-left: 10%;">手机号</view>
		<view style="display: flex; flex-direction: row;">
			<input style="width: 70%; margin-top: 20upx; margin-left: 10%; font-size: 14px; font-weight: bold; color: #7c7b7d;" placeholder="请输入手机号" type="number" maxlength="11" placeholder-style="font-size: 14px; font-weight: 400; color: #999999;" v-model="phone" :disabled="disabled" :adjust-position="false"/>
			<image @click="clearPhoneValue" v-if="phone !== ''" src="@/static/content/close.png" style="width: 40upx; height: 40upx; margin-top: 20upx; margin-left: 20upx;"></image>
		</view>
		<view style="width: 80%; height: 1px; background-color: #F1F1F1; margin-left: 10%; margin-top: 40upx;"></view>
		<view style="font-size: 18px; font-weight: bold; margin-top: 20upx; margin-left: 10%;">验证码</view>
		<view style="display: flex; flex-direction: row;">
			<input style="width: 55%; margin-top: 20upx; margin-left: 10%; font-size: 14px; font-weight: bold; color: #7c7b7d;" placeholder="备用验证码123456" type="number" maxlength="11" placeholder-style="font-size: 14px; font-weight: 400; color: #999999;" v-model="codes"/>
			<view v-if="isShowGetSecond" @click="getSecond" style="font-size: 16px; color: #007AFF; margin-top: 20upx; margin-left: 30upx;">获取验证码</view>
			<view v-if="!isShowGetSecond" style="font-size: 16px; font-weight: bold; color: #999999; margin-top: 20upx; margin-left: 50upx;">还剩{{second}}秒</view>
		</view>
		<view style="width: 80%; height: 1px; background-color: #F1F1F1; margin-left: 10%; margin-top: 40upx;"></view>
		<view @click="login" style="width: 120upx; height: 120upx; margin-top: 120upx; margin-left: 42%; border-radius: 120upx; background:linear-gradient(to right,#42C3FE,#2c8bff);">
			<image src="@/static/youjiantou.png" style="width: 60upx; height: 60upx; margin-top: 30upx; margin-left: 30upx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				isShowGetSecond: true,//是否显示 “获取验证码”
				second: 60,//获取验证码时间倒计时（默认60秒）
				secondControl: "",//控制倒计时的监听器
				codes: "",//手动输入的验证码
				code: "123456",//收到的验证码
				disabled: false,
				
				baseurl: ''
			}
		},
		created() {
			this.baseurl = this.$nodeurl;
		},
		methods: {
			clearPhoneValue(){
				this.phone = "";
			},
			clearSecondControl(){
				// 清楚倒计时监视器
				clearInterval(this.secondControl)
				this.second = 60
				this.isShowGetSecond = true
			},
			getSecond(){
				//获取验证码模块
				if(this.isMobile(this.phone)==false){
					uni.showToast({
						title: '手机号有误',
						icon: 'none',
						position: 'bottom'
					})
				}
				if(this.phone == ""){
					uni.showToast({
						title: '手机号为空',
						icon: 'none',
						position: 'bottom'
					})
				}
				if(this.phone !== "" && this.isMobile(this.phone)){
					this.isShowGetSecond = false
					// 获取验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.disabled = true;
					// 秒数递减
					this.secondControl = setInterval(()=>{
						this.second--;
						if(this.second<1){
							this.clearSecondControl()
						}
					},1000)
				}
			},
			login(){
				if(this.codes !== this.code){
					uni.showToast({
						title: '验证码校验错误',
						icon: 'none',
						position: 'bottom'
					})
				}
				if(this.code == ""){
					uni.showToast({
						title: '请重试获取验证码',
						icon: 'none',
						position: 'bottom'
					})
				}
				if(this.codes == ""){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						position: 'bottom'
					})
				}
				if(this.phone == ""){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						position: 'bottom'
					})
				}
				if(
					this.phone !== "" &&
					this.code !== "" &&
					this.codes !== "" &&
					this.code === this.codes
				){
					uni.showLoading({
						title: '加载中...'
					})
					uni.request({
						url: this.baseurl + '/getUser',
						method: 'POST',
						data:{
							username: this.phone
						},
						success: (res) => {
							if(res.data.value.length == 0){
								// 注册
								uni.request({
									url: this.baseurl + '/addUser',
									method: 'POST',
									data:{
										username: this.phone
									},
									success: (re) => {
										if(re.data.value === "添加成功！"){
											uni.hideLoading();
											uni.setStorageSync("username", this.phone);
											uni.reLaunch({
												url: '../../index/index'
											})
										}
									}
								})
							} else {
								uni.hideLoading();
								uni.setStorageSync("username", this.phone);
								uni.reLaunch({
									url: '../../index/index'
								})
							}
						}
					})
				}
			},
			isMobile(str) {//校验手机号码是否正确
			    var myreg=/^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
			    if (!myreg.test(str)) {
			        return false;
			    } else {
			        return true;
			    }
			},
		}
	}
</script>

<style>

</style>
