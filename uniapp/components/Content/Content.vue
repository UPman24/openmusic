<template>
	<view>
		<view style="width: 100%;">
			<view style="width: 100%; height: 1upx;"></view>
			<!-- #ifdef APP -->
			<view style="font-size: 22px; font-weight: bold; color: #FFFFFF; margin-top: 20rpx; margin-left: 60rpx;">我的</view>
			<!-- #endif -->
			<!-- #ifndef APP -->
			<view style="font-size: 22px; font-weight: bold; color: #FFFFFF; margin-top: 60rpx; margin-left: 60rpx;">我的</view>
			<!-- #endif -->
			<view v-if="!isShowSearch" @click="toSearch" style="width: 85%; display: flex; flex-direction: row; margin-top: 30rpx; margin-left: 6.5%; border-radius: 40rpx; height: 80rpx; background-color: #000000;">
				<image src="@/static/content/search.png" style="width: 40rpx; height: 40rpx; margin-top: 20rpx; margin-left: 30rpx; opacity: 0.8;"></image>
				<view style="font-size: 16px; color: #e8e6e9; opacity: 0.5; margin-top: 20rpx; margin-left: 20rpx;">搜索歌曲</view>
			</view>
			<view v-if="isShowSearch" style="width: 100%; display: flex; flex-direction: row;">
				<view style="width: 70%; display: flex; flex-direction: row; margin-top: 30rpx; margin-left: 6.5%; border-radius: 40rpx; height: 80rpx; background-color: #000000;">
					<image src="@/static/content/search.png" style="width: 40rpx; height: 40rpx; margin-top: 20rpx; margin-left: 30rpx; opacity: 0.8;"></image>
					<input style="width: 70%; color: #e8e6e9; margin-top: 9.5px; margin-left: 20rpx;" placeholder="搜索歌曲" v-model="text" @confirm="confirm" @focus="focus" @blur="blur" :adjust-position="false"/>
					<image v-if="text !== ''" @click="clearText" src="@/static/content/close.png" style="width: 40rpx; height: 40rpx; opacity: 0.5; margin-top: 20rpx; margin-left: 10rpx;"></image>
				</view>
				<view @click="closeSearch" style="font-size: 18px; font-weight: bold; color: #FFFFFF; opacity: 0.8; margin-top: 45rpx; margin-left: 50rpx;">取消</view>
			</view>
			<block v-if="!isShowSearch">
				<!-- 我的音乐 -->
				<view style="display: flex; flex-direction: column; width: 85%; margin-left: 6.5%; margin-top: 40rpx; background-color: #414041; border-radius: 20rpx;">
					<!-- 我喜欢 -->
					<view @click="toMylike" style="width: 85%; margin-top: 30rpx; margin-left: 6.55%; display: flex; flex-direction: row;">
						<image src="@/static/content/like.png" style="width: 75rpx; height: 75rpx;"></image>
						<view style="font-size: 20px; font-weight: bold; color: #FFFFFF; opacity: 0.98; margin-top: 12rpx; margin-left: 20rpx;">我喜欢</view>
					</view>
					<!-- 本地缓存 -->
					<view @click="toMysong" style="width: 85%; margin-top: 30rpx; margin-left: 6.55%; display: flex; flex-direction: row;">
						<image src="@/static/content/storage.png" style="width: 55rpx; height: 55rpx; margin-top: 20rpx; margin-left: 10rpx;"></image>
						<view style="font-size: 20px; font-weight: bold; color: #FFFFFF; opacity: 0.98; margin-top: 22rpx; margin-left: 30rpx;">缓存歌曲</view>
					</view>
					<view style="width: 100%; height: 45rpx;"></view>
				</view>
				<view @click="outlogin" style="width: 85%; height: 80rpx; margin-top: 70rpx; margin-left: 6.5%; background-color: #414041; border-radius: 50rpx;">
					<view style="font-size: 16px; font-weight: bold; text-align: center; color: #FFFFFF; padding-top: 20rpx;">退出登陆</view>
				</view>
			</block>
			<block v-if="isShowSearch">
				<block v-if="isShowMusic">
					<scroll-view :style="'width: 100%; height: '+ (screenHeight * 0.8) +'px; margin-top: 20rpx; mask-image: linear-gradient(to top, transparent, transparent 8%, black 30%);'" :scroll-y="true">
						<block v-if="isClick && Music.length == 0">
							<view style="font-size: 16px; color: #FFFFFF; opacity: 0.8; text-align: center; padding-top: 250rpx;">搜索中...</view>
						</block>
						<block v-for="(list,index) in Music">
							<view @click="playThis(index)" style="display: flex; width: 90%; flex-direction: row; margin-top: 60rpx; margin-left: 6%;">
								<image :src="list.pic" mode="aspectFill" style="width: 100rpx; height: 100rpx; border-radius: 10rpx;"></image>
								<view style="display: flex; flex-direction: column; width: 80%;">
									<view style="font-size: 18px; margin-top: 5rpx; margin-left: 30rpx; font-weight: bold; color: #FFFFFF; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
										{{list.title}}
									</view>
									<view style="font-size: 14px; width: 95%; color: #FFFFFF; margin-left: 30rpx; margin-top: 5rpx;">
										{{list.author}}
									</view>
								</view>
							</view>
						</block>
						<block v-if="Music.length !== 0">
							<view @click="getMore" style="width: 200rpx; height: 80rpx; border: 1px #FFFFFF solid; border-radius: 80rpx; margin-top: 100rpx; margin-left: 38%; opacity: 0.6;">
								<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 20rpx;">获取更多</view>
							</view>
						</block>
						<view style="width: 100%; height: 400rpx;"></view>
					</scroll-view>
				</block>
			</block>
		</view>
		<uni-popup type="right" ref="song">
			<view style="width: 100%;">
				<!-- 中间内容区域 -->
				<!-- #ifdef APP -->
				<mysong :style="'width: '+ windowWidth +'px; height: '+ (screenHeight - safearea) +'px; background-color: #252425; '"></mysong>
				<!-- #endif -->
				<!-- #ifndef APP -->
				<mysong :style="'width: '+ windowWidth +'px; height: '+ (screenHeight)*0.95 +'px; background-color: #252425; '"></mysong>
				<!-- #endif -->
				<!-- tabbar 就是歌曲栏 -->
				<tabbar :class="(showTab)?'ani':'close'" style="position: fixed; bottom: 50rpx; z-index: 1000;"></tabbar>
				<!-- #ifdef APP -->
				<view :class="(showTab)?'ani':'close'" :style="'width: 100%; height: '+ safearea +'px; background-color: #252425; position: fixed; bottom: 0; z-index: 999;'"></view>
				<!-- #endif -->
				<!-- #ifndef APP -->
				<view :class="(showTab)?'ani':'close'" :style="'width: 100%; height: 90rpx; background-color: #252425; position: fixed; bottom: 0; z-index: 999;'"></view>
				<!-- #endif -->
			</view>
		</uni-popup>
		<uni-popup type="right" ref="mylike">
			<view style="width: 100%;">
				<!-- 中间内容区域 -->
				<!-- #ifdef APP -->
				<mylike :style="'width: '+ windowWidth +'px; height: '+ (screenHeight - safearea) +'px; background-color: #252425; '"></mylike>
				<!-- #endif -->
				<!-- #ifndef APP -->
				<mylike :style="'width: '+ windowWidth +'px; height: '+ (screenHeight)*0.95 +'px; background-color: #252425; '"></mylike>
				<!-- #endif -->
				<!-- tabbar 就是歌曲栏 -->
				<tabbar :class="(showTab)?'ani':'close'" style="position: fixed; bottom: 50rpx; z-index: 1000;"></tabbar>
				<!-- #ifdef APP -->
				<view :class="(showTab)?'ani':'close'" :style="'width: 100%; height: '+ safearea +'px; background-color: #252425; position: fixed; bottom: 0; z-index: 999;'"></view>
				<!-- #endif -->
				<!-- #ifndef APP -->
				<view :class="(showTab)?'ani':'close'" :style="'width: 100%; height: 90rpx; background-color: #252425; position: fixed; bottom: 0; z-index: 999;'"></view>
				<!-- #endif -->
			</view>
		</uni-popup>
		<uni-popup type="center" ref="msga1">
			<view style="font-size: 16px; font-weight: bold; color: #FFFFFF;">加载中...</view>
		</uni-popup>
		<uni-popup type="center" ref="msga2">
			<view style="font-size: 16px; font-weight: bold; color: #FFFFFF;">没有更多了</view>
		</uni-popup>
	</view>
</template>

<script>
	import mysong from './mysong.vue';
	import mylike from './mylike.vue';
	import tabbar from '@/components/tabbar/tabbar.vue';
	export default {
		name:"Content",
		data() {
			return {
				text: '',
				isShowSearch: false,//默认不显示搜索内容
				isShowMusic: false,//默认不显示音乐列表
				screenHeight: 0,
				Music: [],
				safearea: 0,
				
				windowWidth: 0,
				showTab: true,
				
				page: 1,
				isClick: false,
				
				platform: ""
			};
		},
		created() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			this.platform = uni.getSystemInfoSync().platform;
			// #ifdef APP
			this.safearea = uni.getSystemInfoSync().safeArea.top;
			// #endif
			uni.$on('close_mysong', (data)=>{
				if(data.ismysong){
					this.$refs.song.close();
				}
			})
			uni.$on('close_mylike', (data)=>{
				if(data.ismysong){
					this.$refs.mylike.close();
				}
			})
		},
		components:{
			mysong,tabbar,mylike
		},
		watch:{
			text(val){
				this.page = 1;
			}
		},
		methods:{
			toMylike(){
				this.$refs.mylike.open("right");
			},
			toMysong(){
				this.$refs.song.open("right");
			},
			playThis(index){
				console.log(this.Music[index]);
				this.$musicInfo.author = this.Music[index].author;
				this.$musicInfo.lrc = this.Music[index].lrc;
				this.$musicInfo.pic = this.Music[index].pic;
				this.$musicInfo.pre_url = this.Music[index].pre_url;
				this.$musicInfo.title = this.Music[index].title;
				this.$musicInfo.url = this.Music[index].url;
				// #ifdef APP
				if(this.platform !== 'ios'){
					this.$refs.msga1.open('center');
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
													this.$refs.msga1.close();
													var savedFilePath = req.savedFilePath;
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
					this.$audio.src = this.$musicInfo.url;
					this.$audio.play();
				}
				// #endif
				// #ifdef H5
				this.$audio.src = this.$musicInfo.url;
				this.$audio.play();
				// #endif
				let music = uni.getStorageSync('music');
				if(music.length === 0){
					music = [];
					uni.setStorageSync('music', []);
				}
				music = uni.getStorageSync('music');
				for(let i=0;i<music.length;i++){
					music[i].isclick = false;
				}
				if(music.length == 0){
					let isToo = true;
					for(let x=0;x<music.length;x++){
						if(music[x].pre_url == this.Music[index].pre_url){
							isToo = false;
						}
					}
					if(isToo){
						let msg = {
							author: this.Music[index].author,
							lrc: this.Music[index].lrc,
							pic: this.Music[index].pic,
							pre_url: this.Music[index].pre_url,
							title: this.Music[index].title,
							url: this.Music[index].url,
							isclick: true
						}
						music.push(msg);
						uni.setStorageSync('music', music);
					}
				} else {
					let isToo = true;
					for(let x=0;x<music.length;x++){
						if(music[x].pre_url == this.Music[index].pre_url){
							isToo = false;
						}
					}
					if(isToo){
						let msg = {
							author: this.Music[index].author,
							lrc: this.Music[index].lrc,
							pic: this.Music[index].pic,
							pre_url: this.Music[index].pre_url,
							title: this.Music[index].title,
							url: this.Music[index].url,
							isclick: true
						}
						music.push(msg);
						uni.setStorageSync('music', music);
					}
				}
				uni.$emit('updateTabbar')
				// #ifdef APP
				if(this.platform !== 'ios'){
					setTimeout(()=>{
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
					},500)
				} else {
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
				}
				// #endif
				// #ifdef H5
				uni.$emit('popshows', {
					ispop: true
				})
				setTimeout(()=>{
					uni.$emit('info', {
						author: this.Music[index].author,
						lrc: this.Music[index].lrc,
						pic: this.Music[index].pic,
						pre_url: this.Music[index].pre_url,
						title: this.Music[index].title,
						url: this.Music[index].url
					})
				},200)
				// #endif
			},
			closeSearch(){
				this.isShowSearch = false;
				this.isShowMusic = false;
				this.isClick = false;
				this.Music = [];
				this.text = "";
				this.page = 1;
			},
			toSearch(){
				this.isShowSearch = true;
			},
			blur(){
				
			},
			focus(){
				this.isShowSearch = true;
			},
			getMore(){
				this.$refs.msga1.open('center');
				this.page++;
				uni.request({
					url: this.$pythonurl + '/kuwo/search/searchMusicBykeyWord?key=' + this.text + '&pn=' + this.page + '&rn=12',
					method: 'GET',
					success: (res) => {
						let music = res.data.data.list;
						for(let i=0;i<music.length;i++){
							let msg = {
								'url': '',
								'pre_url': '',
								'pic': '',
								'title': '',
								'author': '',
								'lrc': ''
							}
							if(music[i]['pic'] === undefined){
								music[i]['pic'] = '';
							} else {
								msg['pic'] = music[i]['pic'];
							}
							msg['title'] = music[i]['name'];
							msg['author'] = music[i]['artist'];
							msg['pre_url'] = this.$pythonurl + '/kuwo/url?mid=' + music[i]['rid'];
							let p = new Promise((resolve,reject)=>{
								let fun = ()=>{
									uni.request({
										url: this.$pythonurl + '/kuwo/url?mid=' + music[i]['rid'],
										method: 'GET',
										success: (qw) => {
											resolve(qw.data.data.url);
										},
										fail: () => {
											fun();
										}
									})
								}
								fun();
							})
							p.then(url => {
								msg['url'] = url;
								let w = new Promise((resolve,reject)=>{
									let fun = ()=>{
										uni.request({
											url: this.$pythonurl + '/kuwo/lrc?musicId=' + music[i]['rid'],
											method: 'GET',
											success: (qa) => {
												resolve(qa.data.data.lrclist);
											},
											fail: () => {
												fun();
											}
										})
									}
									fun();
								})
								w.then(lrc => {
									msg['lrc'] = lrc;
									this.Music.push(msg);
								})
							})
						}
						setTimeout(()=>{
							this.$refs.msga1.close();
							if(this.Music.length == 0){
								this.$refs.msga2.open('center');
								setTimeout(()=>{
									this.$refs.msga2.close();
								},2000)
							}
						},2500)
					}
				})
			},
			confirm(){
				// 触发搜索
				console.log('触发');
				this.Music = [];
				this.isShowMusic = true;
				this.isClick = true;
				if(this.text !== ''){
					uni.request({
						url: this.$pythonurl + '/kuwo/search/searchMusicBykeyWord?key=' + this.text + '&pn=' + this.page + '&rn=12',
						method: 'GET',
						success: (res) => {
							let music = res.data.data.list;
							for(let i=0;i<music.length;i++){
								let msg = {
									'url': '',
									'pre_url': '',
									'pic': '',
									'title': '',
									'author': '',
									'lrc': ''
								}
								if(music[i]['pic'] === undefined){
									music[i]['pic'] = '';
								} else {
									msg['pic'] = music[i]['pic'];
								}
								msg['title'] = music[i]['name'];
								msg['author'] = music[i]['artist'];
								msg['pre_url'] = this.$pythonurl + '/kuwo/url?mid=' + music[i]['rid'];
								let p = new Promise((resolve,reject)=>{
									let fun = ()=>{
										uni.request({
											url: this.$pythonurl + '/kuwo/url?mid=' + music[i]['rid'],
											method: 'GET',
											success: (qw) => {
												resolve(qw.data.data.url);
											},
											fail: () => {
												fun();
											}
										})
									}
									fun();
								})
								p.then(url => {
									msg['url'] = url;
									let w = new Promise((resolve,reject)=>{
										let fun = ()=>{
											uni.request({
												url: this.$pythonurl + '/kuwo/lrc?musicId=' + music[i]['rid'],
												method: 'GET',
												success: (qa) => {
													resolve(qa.data.data.lrclist);
												},
												fail: () => {
													fun();
												}
											})
										}
										fun();
									})
									w.then(lrc => {
										msg['lrc'] = lrc;
										this.Music.push(msg);
									})
								})
							}
							setTimeout(()=>{
								if(this.Music.length == 0){
									this.isClick = false;
									this.$refs.msga2.open('center');
									setTimeout(()=>{
										this.$refs.msga2.close();
									},2000)
								}
							},2200)
						}
					})
				} else {
					uni.showToast({
						title: '输入为空!',
						icon: 'none'
					})
				}
			},
			clearText(){
				this.text = "";
				this.isShowSearch = false;
				this.isClick = false;
				this.Music = [];
			},
			outlogin(){
				uni.showModal({
					title: '是否退出登陆',
					success: (res) => {
						if(res.confirm){
							uni.setStorageSync("username", "");
							uni.reLaunch({
								url: '../../pages/user/user'
							})
						} else {
							uni.showToast({
								title: '已取消',
								icon: 'none'
							})
						}
					}
				})
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
