import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.$pythonurl = '';
Vue.prototype.$nodeurl = '';

if(uni.getStorageSync('next').length == 0){
	uni.setStorageSync("next", {
		next1: true,
		next2: false,
		next3: false
	})
}
// 全局挂载 音乐播放
// #ifdef H5
Vue.prototype.$audio = uni.createInnerAudioContext();
// #endif
// #ifdef APP
Vue.prototype.$audio = uni.getBackgroundAudioManager();
// #endif
Vue.prototype.$platform = uni.getSystemInfoSync().platform;
Vue.prototype.$audio.loop = true;
Vue.prototype.$audio.src = "";
Vue.prototype.$audio.onPlay(() => {
	Vue.prototype.$isplay = true;
	Vue.prototype.$current();
	uni.$emit('isplay', {
		isplay: true
	})
});
Vue.prototype.$audio.onPause(() => {
	Vue.prototype.$isplay = false;
	uni.$emit('isplay', {
		isplay: false
	})
});
Vue.prototype.$timeobj = {
	nowtime: '00:00',
	totaltime: '00:00'
}
Vue.prototype.$isnext = true;
Vue.prototype.$current = ()=>{
	Vue.prototype.$duration = parseInt(Vue.prototype.$audio.duration);
	Vue.prototype.$currentTime = parseInt(Vue.prototype.$audio.currentTime);
	// console.log(Vue.prototype.$currentTime);
	Vue.prototype.$percent = Number(((Vue.prototype.$currentTime / Vue.prototype.$duration) * 100).toFixed(2));
	// console.log(Vue.prototype.$percent);
	// ?️ 获取完整分钟数
	let times = (totalSeconds)=>{
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		function padTo2Digits(num) {
		  return num.toString().padStart(2, '0');
		}
		const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
		return result;
	}
	Vue.prototype.$timeobj = {
		nowtime: times( parseInt(Vue.prototype.$currentTime) ),
		totaltime: times( parseInt(Vue.prototype.$duration) )
	}
	if(Number(Vue.prototype.$percent) >= 99 && Number(Vue.prototype.$percent) <= 100){
		if(Vue.prototype.$isnext == true){
			Vue.prototype.$isnext = false;
			let next1 = uni.getStorageSync("next").next1;
			let next2 = uni.getStorageSync("next").next2;
			let next3 = uni.getStorageSync("next").next3;
			if(next1 && !next2 && !next3){
				setTimeout(()=>{
					Vue.prototype.$audio.play();
					Vue.prototype.$isnext = true;
				},2000)
			} else if(!next1 && next2 && !next3){
				if(uni.getStorageSync("music").length !== 0){
					let music = uni.getStorageSync('music');
					let info = Math.floor(Math.random()*music.length);
					uni.showLoading({
						title: '加载中...'
					})
					uni.request({
						url: music[info].pre_url,
						method: 'GET',
						success: (res) => {
							let data = res.data.data;
							music[info].isclick = true;
							music[info].url = data.url;
							for(let i=0;i<music.length;i++){
								if(i !== info){
									music[i].isclick = false;
								}
							}
							uni.setStorageSync('music', music);
							uni.$emit('updateTabbar');
							uni.$emit('playlist_update');
							uni.$emit('info', {
								author: music[info].author,
								lrc: music[info].lrc,
								pic: music[info].pic,
								pre_url: music[info].pre_url,
								title: music[info].title,
								url: music[info].url
							})
							Vue.prototype.$musicInfo.author = music[info].author;
							Vue.prototype.$musicInfo.lrc = music[info].lrc;
							Vue.prototype.$musicInfo.pic = music[info].pic;
							Vue.prototype.$musicInfo.pre_url = music[info].pre_url;
							Vue.prototype.$musicInfo.title = music[info].title;
							Vue.prototype.$musicInfo.url = music[info].url;
							// #ifdef APP
							if(Vue.prototype.$platform !== 'ios'){
								uni.downloadFile({
									url: Vue.prototype.$musicInfo.url,
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
																Vue.prototype.$audio.src = savedFilePath;
																uni.$emit('update_image');
																Vue.prototype.$audio.play();
																Vue.prototype.$isnext = true;
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
								uni.hideLoading();
								Vue.prototype.$audio.src = Vue.prototype.$musicInfo.url;
								Vue.prototype.$audio.play();
								Vue.prototype.$isnext = true;
							}
							// #endif
							// #ifdef H5
							uni.hideLoading();
							if(Vue.prototype.$platform !== 'ios'){
								uni.$emit('update_image');
							}
							Vue.prototype.$audio.src = Vue.prototype.$musicInfo.url;
							Vue.prototype.$audio.play();
							Vue.prototype.$isnext = true;
							// #endif
						}
					})
				}
			} else if(!next1 && !next2 && next3){
				if(uni.getStorageSync("music").length !== 0){
					let music = uni.getStorageSync('music');
					let info = 0;
					for(let i=0;i<music.length;i++){
						if(music[i].isclick){
							info = i;
						}
					}
					if(info == music.length-1){
						uni.showLoading({
							title: '加载中...'
						})
						uni.request({
							url: music[0].pre_url,
							method: 'GET',
							success: (res) => {
								let data = res.data.data;
								music[0].url = data.url;
								music[0].isclick = true;
								for(let j=0;j<music.length;j++){
									if(j !== 0){
										music[j].isclick = false;
									}
								}
								uni.setStorageSync('music', music);
								uni.$emit('updateTabbar');
								uni.$emit('playlist_update');
								uni.$emit('info', {
									author: music[0].author,
									lrc: music[0].lrc,
									pic: music[0].pic,
									pre_url: music[0].pre_url,
									title: music[0].title,
									url: music[0].url
								})
								Vue.prototype.$musicInfo.author = music[0].author;
								Vue.prototype.$musicInfo.lrc = music[0].lrc;
								Vue.prototype.$musicInfo.pic = music[0].pic;
								Vue.prototype.$musicInfo.pre_url = music[0].pre_url;
								Vue.prototype.$musicInfo.title = music[0].title;
								Vue.prototype.$musicInfo.url = music[0].url;
								// #ifdef APP
								if(Vue.prototype.$platform !== 'ios'){
									uni.downloadFile({
										url: Vue.prototype.$musicInfo.url,
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
																	Vue.prototype.$audio.src = savedFilePath;
																	uni.$emit('update_image');
																	Vue.prototype.$audio.play();
																	Vue.prototype.$isnext = true;
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
									uni.hideLoading();
									Vue.prototype.$audio.src = Vue.prototype.$musicInfo.url;
									Vue.prototype.$audio.play();
									Vue.prototype.$isnext = true;
								}
								// #endif
								// #ifdef H5
								uni.hideLoading();
								if(Vue.prototype.$platform !== 'ios'){
									uni.$emit('update_image');
								}
								Vue.prototype.$audio.src = Vue.prototype.$musicInfo.url;
								Vue.prototype.$audio.play();
								Vue.prototype.$isnext = true;
								// #endif
							}
						})
					} else {
						uni.showLoading({
							title: '加载中...'
						})
						uni.request({
							url: music[info+1].pre_url,
							method: 'GET',
							success: (res) => {
								let data = res.data.data;
								music[info+1].url = data.url;
								music[info+1].isclick = true;
								for(let j=0;j<music.length;j++){
									if(j !== info+1){
										music[j].isclick = false;
									}
								}
								uni.setStorageSync('music', music);
								uni.$emit('updateTabbar')
								uni.$emit('info', {
									author: music[info+1].author,
									lrc: music[info+1].lrc,
									pic: music[info+1].pic,
									pre_url: music[info+1].pre_url,
									title: music[info+1].title,
									url: music[info+1].url
								})
								Vue.prototype.$musicInfo.author = music[info+1].author;
								Vue.prototype.$musicInfo.lrc = music[info+1].lrc;
								Vue.prototype.$musicInfo.pic = music[info+1].pic;
								Vue.prototype.$musicInfo.pre_url = music[info+1].pre_url;
								Vue.prototype.$musicInfo.title = music[info+1].title;
								Vue.prototype.$musicInfo.url = music[info+1].url;
								// #ifdef APP
								if(Vue.prototype.$platform !== 'ios'){
									uni.downloadFile({
										url: Vue.prototype.$musicInfo.url,
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
																	Vue.prototype.$audio.src = savedFilePath;
																	uni.$emit('update_image');
																	Vue.prototype.$audio.play();
																	Vue.prototype.$isnext = true;
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
									uni.hideLoading();
									Vue.prototype.$audio.src = Vue.prototype.$musicInfo.url;
									Vue.prototype.$audio.play();
									Vue.prototype.$isnext = true;
								}
								// #endif
								// #ifdef H5
								uni.hideLoading();
								if(Vue.prototype.$platform !== 'ios'){
									uni.$emit('update_image');
								}
								Vue.prototype.$audio.src = Vue.prototype.$musicInfo.url;
								Vue.prototype.$audio.play();
								Vue.prototype.$isnext = true;
								// #endif
							}
						})
					}
				}
			}
		}
	}
	setTimeout(()=>{
		if(Vue.prototype.$isplay == true){
			Vue.prototype.$current();
		}
	},1000)
}
Vue.prototype.$musicInfo = {
	author: "",
	lrc: [],
	pic: "",
	pre_url: "",
	title: "",
	url: ""
};
Vue.prototype.$showTab = true

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif