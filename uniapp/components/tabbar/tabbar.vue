<template>
	<view style="width: 100%;">
		<block v-if="platform === 'PC'">
			<view v-if="shows" style="display: flex; flex-direction: row;">
				<!-- 封面 -->
				<view style="width: 90%; height: 46.5px; margin-left: 17.5px;">
					<image @click="touchTabbar" mode="aspectFill" :src="pic" style="width: 46.5px; height: 46.5px; border-radius: 5px; position: absolute; z-index: 123;"></image>
					<image @click="touchTabbar" src="@/static/tabbar/bfq.png" style="width: 40px; background-color: #3e4044; height: 40px; border-radius: 49px; position: absolute; margin-left: 16px; margin-top: 4px; z-index: 122;"></image>
					<!-- 显示歌词条部分 -->
					<view style="width: 87%; height: 41.5px; background-color: #3e4044; margin-top: 5px; margin-left: 45px; border-top-right-radius: 25px; border-bottom-right-radius: 25px; display: flex; flex-direction: row;">
						<view style="width: 1px; height: 0.1px;"></view>
						<view @click="touchTabbar" style="width: 80%; height: 22.5px; display: flex; flex-direction: row; margin-top: 8px; overflow: hidden; margin-left: 15px;">
							<!-- 中间内容 -->
							<view style="width: 100%; height: 100%; mask-image: linear-gradient(to left, transparent, transparent 0%, black 10%);">
								<view style="width: 100%; height: 100%; mask-image: linear-gradient(to right, transparent, transparent 0%, black 10%);">
									<swiper style="width: 100%; height: 100%;" :circular="true" :autoplay="false" :indicator-dots="false" @change="change">
										<swiper-item v-for="(li,index) in swiperList" :key="index">
											<view style="width: 100%; height: 100%;">
												<view style="font-size: 15px; padding-top: 3px; text-align: center; color: #FFFFFF; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
													{{li.title}} ~ {{li.author}}
												</view>
											</view>
										</swiper-item>
									</swiper>
								</view>
							</view>
						</view>
						<view style="width: 25px; height: 25px; display: flex; flex-direction: row; margin-top: 9px; margin-left: 8px; border-radius: 45px;">
							<!-- 进度小圆圈 -->
							<image v-if="showChange" @click="to_pause" src="@/static/tabbar/play.png" style="width: 29.5px; height: 29px; margin-top: -2px; margin-left: -2px; position: absolute; z-index: 125;"></image>
							<image v-if="!showChange" @click="to_play" src="@/static/tabbar/pause.png" style="width: 27px; height: 26.5px; margin-top: -0.5px; margin-left: -1px; position: absolute; z-index: 125;"></image>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="platform !== 'PC'">
			<view v-if="shows" style="display: flex; flex-direction: row;">
				<!-- 封面 -->
				<view style="width: 90%; height: 93rpx; margin-left: 35rpx;">
					<image @click="touchTabbar" mode="aspectFill" :src="pic" style="width: 93rpx; height: 93rpx; border-radius: 10rpx; position: absolute; z-index: 123;"></image>
					<image @click="touchTabbar" src="@/static/tabbar/bfq.png" style="width: 80rpx; background-color: #3e4044; height: 80rpx; border-radius: 98rpx; position: absolute; margin-left: 32rpx; margin-top: 8rpx; z-index: 122;"></image>
					<!-- 显示歌词条部分 -->
					<view style="width: 87%; height: 83rpx; background-color: #3e4044; margin-top: 10rpx; margin-left: 90rpx; border-top-right-radius: 50rpx; border-bottom-right-radius: 50rpx; display: flex; flex-direction: row;">
						<view style="width: 1px; height: 0.1px;"></view>
						<view @click="touchTabbar" style="width: 80%; height: 55rpx; display: flex; flex-direction: row; margin-top: 16rpx;overflow: hidden; margin-left: 30rpx;">
							<!-- 中间内容 -->
							<view style="width: 100%; height: 100%; mask-image: linear-gradient(to left, transparent, transparent 0%, black 10%);">
								<view style="width: 100%; height: 100%; mask-image: linear-gradient(to right, transparent, transparent 0%, black 10%);">
									<swiper style="width: 100%; height: 100%;" :circular="true" :autoplay="false" :indicator-dots="false" @change="change">
										<swiper-item v-for="(li,index) in swiperList" :key="index">
											<view style="width: 100%; height: 100%;">
												<view style="font-size: 15px; padding-top: 6rpx; text-align: center; color: #FFFFFF; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
													{{li.title}} ~ {{li.author}}
												</view>
											</view>
										</swiper-item>
									</swiper>
								</view>
							</view>
						</view>
						<view style="width: 50rpx; height: 50rpx; display: flex; flex-direction: row; margin-top: 18rpx; margin-left: 16rpx; border-radius: 90rpx;">
							<!-- 进度小圆圈 -->
							<circle-progress-bar v-if="platform === 'ios'" :border_width="3" :pro="pro" :animate="true" :start="0" border_color="#FFFFFF" border_back_color="transparent" background="transparent" unit="px" :size="26"></circle-progress-bar>
							<image v-if="showChange" @click="to_pause" src="@/static/tabbar/play.png" style="width: 59rpx; height: 58rpx; margin-top: -4rpx; margin-left: -4rpx; position: absolute; z-index: 125;"></image>
							<image v-if="!showChange" @click="to_play" src="@/static/tabbar/pause.png" style="width: 54rpx; height: 53rpx; margin-top: -1rpx; margin-left: -2rpx; position: absolute; z-index: 125;"></image>
						</view>
					</view>
				</view>
			</view>
		</block>
		<uni-popup type="center" ref="msgs">
			<view style="width: 100%;">
				<view style="font-size: 14px; color: #FFFFFF;">请稍等...</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"tabbar",
		data() {
			return {
				pro: 0.0001,
				showChange: false,//默认暂停
				
				author: "",//作者
				lrc: "",//歌词
				pic: "",//封面
				pre_url: "",//预览链接
				title: "",//歌曲名称
				url: "",//歌曲链接
				
				swiperList: [],
				current: 0,
				
				shows: true,
				
				platform: ""
			};
		},
		created() {
			if(this.$isplay){
				this.showChange = true;
				this.perCircle();
			} else {
				this.showChange = false;
			}
			let platform = uni.getSystemInfoSync().platform;
			if(platform !== 'ios' && platform !== 'android'){
				this.platform = "PC";
			} else {
				this.platform = uni.getSystemInfoSync().platform;
			}
			if(uni.getStorageSync('music').length !== 0){
				let list = uni.getStorageSync('music');
				let List = [];
				let info = 0;
				for(let i=0;i<list.length;i++){
					if(list[i].isclick == true){
						this.$musicInfo.author = list[i].author;
						this.$musicInfo.lrc = list[i].lrc;
						this.$musicInfo.pic = list[i].pic;
						this.$musicInfo.pre_url = list[i].pre_url;
						this.$musicInfo.title = list[i].title;
						this.$musicInfo.url = list[i].url;
						List.push(list[i])
						info = i;
					}
				}
				for(let i=0;i<list.length;i++){
					if(i !== info){
						List.push(list[i])
					}
				}
				this.swiperList = List;
			}
			this.author = this.$musicInfo.author;
			this.lrc = this.$musicInfo.lrc;
			this.pic = this.$musicInfo.pic;
			this.pre_url = this.$musicInfo.pre_url;
			this.title = this.$musicInfo.title;
			this.url = this.$musicInfo.url;
			uni.$on('isplay', (data)=>{
				this.perCircle();
				this.showChange = data.isplay;
			})
			uni.$on('info', (data)=>{
				this.author = data.author;
				this.lrc = data.lrc;
				this.pic = data.pic;
				this.pre_url = data.pre_url;
				this.title = data.title;
				this.url = data.url;
			})
			uni.$on('updateTabbar', ()=>{
				if(uni.getStorageSync('music').length !== 0){
					this.shows = false;
					let list = uni.getStorageSync('music');
					let List = [];
					let info = 0;
					for(let i=0;i<list.length;i++){
						if(list[i].isclick == true){
							this.$musicInfo.author = list[i].author;
							this.$musicInfo.lrc = list[i].lrc;
							this.$musicInfo.pic = list[i].pic;
							this.$musicInfo.pre_url = list[i].pre_url;
							this.$musicInfo.title = list[i].title;
							this.$musicInfo.url = list[i].url;
							this.author = this.$musicInfo.author;
							this.lrc = this.$musicInfo.lrc;
							this.pic = this.$musicInfo.pic;
							this.pre_url = this.$musicInfo.pre_url;
							this.title = this.$musicInfo.title;
							this.url = this.$musicInfo.url;
							List.push(list[i])
							info = i;
						}
					}
					for(let i=0;i<list.length;i++){
						if(i !== info){
							List.push(list[i])
						}
					}
					this.swiperList = List;
					setTimeout(()=>{
						this.shows = true;
					},200)
				}
			})
		},
		methods:{
			change(e){
				let info = e.target.current;
				this.$refs.msgs.open('center');
				uni.request({
					url: this.swiperList[info].pre_url,
					method: 'GET',
					success: (res) => {
						let data = res.data.data;
						this.swiperList[info].url = data.url;
						this.$musicInfo.author = this.swiperList[info].author;
						this.$musicInfo.lrc = this.swiperList[info].lrc;
						this.$musicInfo.pic = this.swiperList[info].pic;
						this.$musicInfo.pre_url = this.swiperList[info].pre_url;
						this.$musicInfo.title = this.swiperList[info].title;
						this.$musicInfo.url = this.swiperList[info].url;
						this.author = this.$musicInfo.author;
						this.lrc = this.$musicInfo.lrc;
						this.pic = this.$musicInfo.pic;
						this.pre_url = this.$musicInfo.pre_url;
						this.title = this.$musicInfo.title;
						this.url = this.$musicInfo.url;
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
															this.$refs.msgs.close();
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
							this.$refs.msgs.close();
							this.$audio.src = this.$musicInfo.url;
							this.$audio.play();
						}
						// #endif
						// #ifdef H5
						this.$refs.msgs.close();
						this.$audio.src = this.$musicInfo.url;
						this.$audio.play();
						// #endif
						let list = uni.getStorageSync('music');
						let ins = 0;
						for(let i=0;i<list.length;i++){
							if(list[i].pre_url === this.swiperList[info].pre_url){
								list[i].isclick = true;
								ins = i;
							}
						}
						for(let i=0;i<list.length;i++){
							if(i !== ins){
								list[i].isclick = false;
							}
						}
						uni.setStorageSync('music', list);
					}
				})
			},
			touchTabbar(){
				let music = uni.getStorageSync('music');
				if(music.length !== 0){
					uni.$emit('popshows', {
						ispop: true
					})
				} else {
					uni.showToast({
						title: '暂无播放，请搜索音乐...',
						icon: 'none',
						duration: 3000
					})
				}
				
			},
			perCircle(){
				this.pro = this.$percent / 100;
				setTimeout(()=>{
					if(this.$isplay){
						this.perCircle();
					}
				},1000)
			},
			to_pause(){
				this.showChange = false;
				this.$audio.pause();
			},
			to_play(){
				let music = uni.getStorageSync('music');
				if(music.length !== 0){
					this.showChange = true;
					this.$audio.play();
					this.perCircle();
				} else {
					uni.showToast({
						title: '暂无播放，请搜索音乐...',
						icon: 'none',
						duration: 3000
					})
				}
			}
		}
	}
</script>

<style>

</style>
