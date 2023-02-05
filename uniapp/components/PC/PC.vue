<template>
	<view :style="'width: '+ windowWidth +'px; height: '+ windowHeight +'px;'">
		<view style="display: flex; flex-direction: row; width: 100%; height: 100%;">
			<view style="width: 20%; height: 100%; border-top-left-radius: 20px; border-bottom-left-radius: 20px; border-right: 1px solid #373638;">
				<view style="display: flex; flex-direction: row; margin-top: 15px; margin-left: 20%;">
					<image src="@/static/music.png" style="width: 40px; height: 40px; border-radius: 10px;"></image>
					<view style="font-size: 20px; font-weight: bold; color: #FFFFFF; margin-top: 5px; margin-left: 15px;">小北云音乐</view>
				</view>
				<scroll-view style="width: 100%; height: 88%; margin-top: 5%;" :scroll-y="true">
					<view style="width: 100%; height: 1rpx;"></view>
					<view @click="toMylike" style="width: 80%; height: 40px; display: flex; flex-direction: row; border-radius: 10px; background-color: #373638; margin-left: 10%; margin-top: 20px;">
						<view style="font-size: 16px; width: 100%; padding-top: 8px; opacity: 0.8; font-weight: bold; color: #FFFFFF; text-align: center;">我喜欢</view>
					</view>
					<view @click="toMysong" style="width: 80%; height: 40px; display: flex; flex-direction: row; border-radius: 10px; background-color: #373638; margin-left: 10%; margin-top: 20px;">
						<view style="font-size: 16px; width: 100%; padding-top: 8px; opacity: 0.8; font-weight: bold; color: #FFFFFF; text-align: center;">缓存歌曲</view>
					</view>
					<view @click="outlogin" style="width: 80%; height: 40px; display: flex; flex-direction: row; border-radius: 30px; background-color: #373638; margin-left: 10%; margin-top: 40px;">
						<view style="font-size: 16px; width: 100%; padding-top: 8px; opacity: 0.8; font-weight: bold; color: #FFFFFF; text-align: center;">退出登录</view>
					</view>
				</scroll-view>
			</view>
			<view style="display: flex; flex-direction: column; width: 80%; height: 100%; border-top-right-radius: 20px; border-bottom-right-radius: 20px;">
				<view style="width: 100%; height: 11%; display: flex; flex-direction: row;">
					<view style="width: 40%; display: flex; flex-direction: row; margin-top: 15px; margin-left: 30px; border-radius: 20px; height: 40px; background-color: #000000;">
						<image src="@/static/content/search.png" style="width: 20px; height: 20px; margin-top: 10px; margin-left: 15px; opacity: 0.8;"></image>
						<input style="width: 80%; color: #e8e6e9; margin-top: 9.5px; margin-left: 10px;" placeholder="搜索歌曲" v-model="text" @confirm="confirm" :adjust-position="false"/>
						<image v-if="text !== ''" @click="clearText" src="@/static/content/close.png" style="width: 20px; height: 20px; opacity: 0.5; margin-top: 10px; margin-left: 5px;"></image>
					</view>
				</view>
				<view style="width: 100%; height: 79%; border-top: 1px solid #373638;">
					<scroll-view style="width: 100%; height: 100%; mask-image: linear-gradient(to top, transparent, transparent 2%, black 30%);" :scroll-y="true">
						<block v-if="isClick && Music.length == 0">
							<view style="font-size: 16px; color: #FFFFFF; opacity: 0.8; text-align: center; padding-top: 250rpx;">搜索中...</view>
						</block>
						<block v-for="(list,index) in Music">
							<view @click="playThis(index)" style="display: flex; flex-direction: row; margin-top: 30px; margin-left: 4%;">
								<image :src="list.pic" mode="aspectFill" style="width: 50px; height: 50px; border-radius: 5px;"></image>
								<view style="display: flex; flex-direction: column;">
									<view style="font-size: 18px; margin-top: 2.5px; margin-left: 15px; font-weight: bold; color: #FFFFFF; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1;">
										{{list.title}}
									</view>
									<view style="font-size: 14px; color: #FFFFFF; margin-left: 15px; margin-top: 2.5px;">{{list.author}}</view>
								</view>
							</view>
						</block>
						<block v-if="Music.length !== 0">
							<view @click="getMore" style="width: 100px; height: 40px; border: 1px #FFFFFF solid; border-radius: 40px; margin-top: 50px; margin-left: 38%; opacity: 0.6;">
								<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 10px;">获取更多</view>
							</view>
						</block>
						<block v-if="!isClick && Music.length == 0">
							<view style="width: 160px; height: 40px; border: 1px #FFFFFF solid; border-radius: 40px; margin-top: 20%; margin-left: 38%; opacity: 0.6; position: absolute;">
								<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 10px;">快来搜索一下吧</view>
							</view>
						</block>
						<view style="width: 100%; height: 200px;"></view>
					</scroll-view>
				</view>
				<view style="width: 100%; height: 10%; border-top: 1px solid #373638;">
					<!-- tabbar 就是歌曲栏 -->
					<view style="width: 100%; display: flex; flex-direction: row;">
						<tabbar style="width: 38%; margin-top: 8px; margin-left: 2%;"></tabbar>
						<view style="width: 55%; height: 40px; margin-top: 13px;">
							<view style="width: 100%; text-align: center; font-size: 16px; font-weight: bold; color: #FFFFFF; padding-top: 10px;">
								{{textLrc}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup type="right" ref="song">
			<view style="width: 100%;">
				<!-- 中间内容区域 -->
				<mysong :style="'width: '+ windowWidth*0.4 +'px; background-color: #252425; '"></mysong>
			</view>
		</uni-popup>
		<uni-popup type="right" ref="mylike">
			<view style="width: 100%;">
				<!-- 中间内容区域 -->
				<mylike :style="'width: '+ windowWidth*0.4 +'px; background-color: #252425; '"></mylike>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="msgb1">
			<view style="font-size: 16px; font-weight: bold; color: #FFFFFF;">加载中...</view>
		</uni-popup>
		<uni-popup type="center" ref="msgb2">
			<view style="font-size: 16px; font-weight: bold; color: #FFFFFF;">没有更多了</view>
		</uni-popup>
	</view>
</template>

<script>
	import mysong from './mysongs.vue';
	import mylike from './mylikes.vue';
	export default {
		name:"PC",
		data() {
			return {
				windowWidth: 0,
				windowHeight: 0,
				text: '',
				Music: [],
				page: 1,
				isClick: false,
				textLrc: ""
			};
		},
		props: {
			Width: Number,
			Height: Number
		},
		components:{
			mysong,mylike
		},
		watch:{
			text(val){
				if(val == ""){
					this.page = 1;
					this.isClick = false;
				}
			}
		},
		created() {
			this.windowWidth = this.Width;
			this.windowHeight = this.Height;
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
			uni.$on('isplay', (data)=>{
				let isplay = data.isplay;
				if(isplay){
					this.perCircle();
				}
			})
		},
		methods: {
			perCircle(){
				let endper = this.$percent;
				let nowtime = this.$timeobj.nowtime;
				let totaltime = this.$timeobj.totaltime;
				let newtime = parseInt(Number(this.$currentTime));
				let lrc = this.$musicInfo.lrc;
				let lrcshows = false;
				for(let i=0;i<lrc.length;i++){
					let num = parseInt(Number(lrc[i].time));
					if(newtime > num-1 && newtime <= num){
						lrcshows = true;
						this.textLrc = lrc[i].lineLyric;
					}
				}
				lrc = [];
				setTimeout(()=>{
					if(this.$isplay){
						this.perCircle();
					}
				},1000)
			},
			toMylike(){
				this.$refs.mylike.open("right");
			},
			toMysong(){
				this.$refs.song.open("right");
			},
			clearText(){
				this.Music = [];
				this.text = "";
				this.page = 1;
				this.isClick = false;
			},
			playThis(index){
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
				uni.$emit('info', {
					author: this.Music[index].author,
					lrc: this.Music[index].lrc,
					pic: this.Music[index].pic,
					pre_url: this.Music[index].pre_url,
					title: this.Music[index].title,
					url: this.Music[index].url
				})
				// #endif
			},
			getMore(){
				this.$refs.msgb1.open('center');
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
							this.$refs.msgb1.close();
							if(this.Music.length == 0){
								this.$refs.msgb2.open('center');
								setTimeout(()=>{
									this.$refs.msgb2.close();
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
									this.$refs.msgb2.open('center');
									setTimeout(()=>{
										this.$refs.msgb2.close();
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
			outlogin(){
				uni.showModal({
					title: '是否退出登陆',
					success: (res) => {
						if(res.confirm){
							uni.setStorageSync("username", "");
							uni.reLaunch({
								url: '/pages/user/user'
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
		},
	}
</script>

<style>

</style>