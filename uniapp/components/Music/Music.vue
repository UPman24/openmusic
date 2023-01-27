<template>
	<view>
		<!-- 背景 -->
		<image v-if="platform === 'ios'" :src="pic" mode="aspectFill" class="img-back" :style="'height: '+ screenHeight +'px;'"></image>
		<helang-blur v-if="platform !== 'ios'" :params="params" class="helan" style="position: absolute; z-index: -1;"></helang-blur>
		<!-- #ifdef APP -->
		<view style="width: 100%; height: 80rpx; background-color: transparent;"></view>
		<!-- 1.顶部菜单 -->
		<view style="display: flex; flex-direction: row;">
			<image @click="close" src="@/static/music/low.png" style="width: 50rpx; height: 44rpx; margin-left: 60rpx; margin-top: 40rpx;"></image>
			<view style="display: flex; flex-direction: row; margin-left: 25%; margin-top: 35rpx;">
				<view @click="gequ" :style="'font-size: 16px; font-weight: bold; color: #FFFFFF; opacity: '+ opc1 +';'">歌曲</view>
				<view style="font-size: 14px; color: #FFFFFF; opacity: 0.5;">｜</view>
				<view @click="geci" :style="'font-size: 16px; font-weight: bold; color: #FFFFFF; opacity: '+ opc2 +';'">歌词</view>
			</view>
		</view>
		<!-- 2.内容部分 -->
		<swiper :style="'width: 100%; height: '+ (screenHeight*0.85) +'px; position: absolute;'" :current="current" @change="swithChange" :disable-touch="disableTouch">
			<swiper-item>
				<scroll-view v-if="platform !== 'ios'" :style="'width: 100%; height: '+ (screenHeight*0.85) +'px; margin-top: 40rpx; mask-image: linear-gradient(to top, transparent, transparent 3%, black 10%);'" :scroll-y="true">
					<view style="width: 100%; height: 100%;">
						<!-- 图片 -->
						<view style="width: 650rpx; height: 650rpx; margin-top: 60rpx; margin-left: 6.5%;">
							<image mode="aspectFill" :src="pic" style="width: 100%; height: 100%; border-radius: 20rpx; box-shadow: 0upx 0upx 2upx #f9f8ff;"></image>
						</view>
						<!-- 歌手信息 -->
						<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 6.5%;">
							<view style="display: flex; flex-direction: column;">
								<view style="width: 500rpx; font-size: 28px; font-weight: bold; color: #fefcff; background-color: transparent; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
									{{title}}
								</view>
								<view style="width: 500rpx; font-size: 18px; font-weight: bold; color: #fefcff; margin-top: 10rpx; background-color: transparent; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
									{{author}}
								</view>
							</view>
							<!-- 爱心 -->
							<view style="margin-left: 65rpx; display: flex; flex-direction: column;">
								<image v-if="!islike" @click="like" src="@/static/music/no_like.png" style="width: 80rpx; height: 80rpx; opacity: 0.8;"></image>
								<image v-if="islike" @click="like" src="@/static/music/like.png" style="width: 80rpx; height: 80rpx; opacity: 0.8;"></image>
								<view style="font-size: 16px; color: #FFFFFF; text-align: center; margin-top: 15rpx; opacity: 0.9;">喜欢</view>
							</view>
						</view>
						<!-- 信息栏 -->
						<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 6.5%;">
							<!-- 下载 -->
							<view @click="download" style="display: flex; flex-direction: column; opacity: 0.8; margin-top: 7rpx;">
								<image src="@/static/music/download.png" style="width: 65rpx; height: 65rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">下载</view>
							</view>
							<!-- 歌曲循环设置 -->
							<view @click="nextCircle" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%;">
								<image v-if="next1" src="@/static/music/one_circle.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<image v-if="next2" src="@/static/music/luan_play.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<image v-if="next3" src="@/static/music/next_play.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<view v-if="next1" style="font-size: 14px; color: #FFFFFF; text-align: center;">单曲循环</view>
								<view v-if="next2" style="font-size: 14px; color: #FFFFFF; text-align: center;">随机播放</view>
								<view v-if="next3" style="font-size: 14px; color: #FFFFFF; text-align: center;">顺序播放</view>
							</view>
							<!-- 播放列表 -->
							<view @click="toPlaylist" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%; margin-top: 9rpx;">
								<image src="@/static/music/play_list.png" style="width: 60rpx; height: 60rpx; margin-left: 18rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">播放列表</view>
							</view>
							<!-- 更多 -->
							<view @click="toMore" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%;">
								<image src="@/static/music/more.png" style="width: 68rpx; height: 68rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">更多</view>
							</view>
						</view>
						<!-- 进度条 -->
						<view @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" style="display: flex; flex-direction: column; height: 160rpx;">
							<!-- 底座进度条 -->
							<view style="width: 85%; margin-top: 70rpx; height: 5.8rpx; border-radius: 20rpx; margin-left: 6.5%; background-color: #FFFFFF; opacity: 0.5;"></view>
							<!-- 未触摸 -->
							<view v-if="!disableTouch" style="width: 85%; position: absolute; z-index: 1003; margin-top: 70rpx; margin-left: 6.5%;">
								<!-- 1.白底 没有触摸的时候的进度条 -->
								<view :style="'width: '+ endper +'%; height: 5.8rpx; border-radius: 20rpx; background-color: #FFFFFF;'"></view>
								<!-- 2.白底 圆圈的小点 -->
								<view :style="'margin-left: '+ (endper - 1) +'%; width: 16rpx; height: 16rpx; margin-top: -10rpx; background-color: #FFFFFF; border-radius: 30rpx; position: absolute; z-index: 1004;'"></view>
							</view>
							<!-- 触摸 -->
							<view v-if="disableTouch" style="width: 85%; position: absolute; z-index: 1003; margin-top: 70rpx; margin-left: 6.5%;">
								<view :style="'width: '+ percent +'%; height: 5.8rpx; border-radius: 20rpx; background-color: #FFFFFF;'"></view>
								<view :style="'margin-left: '+ (percent - 1) +'%; width: 16rpx; height: 16rpx; margin-top: -10rpx; background-color: #FFFFFF; border-radius: 30rpx; position: absolute; z-index: 1004;'"></view>
							</view>
							<!-- 不触摸 -->
							<view v-if="!disableTouch" style="display: flex; flex-direction: row;">
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; left: 6%; margin-top: 20rpx;">{{nowtime}}</view>
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; right: 9%; margin-top: 20rpx;">{{totaltime}}</view>
							</view>
							<!-- 触摸 -->
							<view v-if="disableTouch" style="display: flex; flex-direction: row;">
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; left: 6%; margin-top: 20rpx;">{{nowtimeX}}</view>
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; right: 9%; margin-top: 20rpx;">{{totaltime}}</view>
							</view>
						</view>
						<!-- 播放器 -->
						<view style="display: flex; flex-direction: row; margin-top: 10rpx;">
							<image @click="beforeMusic" src="@/static/music/before.png" style="width: 100rpx; height: 100rpx; margin-left: 14%;"></image>
							<image v-if="isplay" @click="plays" src="@/static/music/play.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
							<image v-if="!isplay" @click="plays" src="@/static/music/pause.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
							<image @click="nextMusic" src="@/static/music/next.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
						</view>
					</view>
					<view style="width: 100%; height: 200rpx;"></view>
				</scroll-view>
				<block v-if="platform === 'ios'">
					<view style="width: 100%; height: 100%;">
						<!-- 图片 -->
						<view style="width: 650rpx; height: 650rpx; margin-top: 60rpx; margin-left: 6.5%;">
							<image mode="aspectFill" :src="pic" style="width: 100%; height: 100%; border-radius: 20rpx; box-shadow: 0upx 0upx 2upx #f9f8ff;"></image>
						</view>
						<!-- 歌手信息 -->
						<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 6.5%;">
							<view style="display: flex; flex-direction: column;">
								<view style="width: 500rpx; font-size: 28px; font-weight: bold; color: #fefcff; background-color: transparent; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
									{{title}}
								</view>
								<view style="width: 500rpx; font-size: 18px; font-weight: bold; color: #fefcff; margin-top: 10rpx; background-color: transparent; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
									{{author}}
								</view>
							</view>
							<!-- 爱心 -->
							<view style="margin-left: 65rpx; display: flex; flex-direction: column;">
								<image v-if="!islike" @click="like" src="@/static/music/no_like.png" style="width: 80rpx; height: 80rpx; opacity: 0.8;"></image>
								<image v-if="islike" @click="like" src="@/static/music/like.png" style="width: 80rpx; height: 80rpx; opacity: 0.8;"></image>
								<view style="font-size: 16px; color: #FFFFFF; text-align: center; margin-top: 15rpx; opacity: 0.9;">喜欢</view>
							</view>
						</view>
						<!-- 信息栏 -->
						<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 6.5%;">
							<!-- 下载 -->
							<view @click="download" style="display: flex; flex-direction: column; opacity: 0.8; margin-top: 7rpx;">
								<image src="@/static/music/download.png" style="width: 65rpx; height: 65rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">下载</view>
							</view>
							<!-- 歌曲循环设置 -->
							<view @click="nextCircle" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%;">
								<image v-if="next1" src="@/static/music/one_circle.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<image v-if="next2" src="@/static/music/luan_play.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<image v-if="next3" src="@/static/music/next_play.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<view v-if="next1" style="font-size: 14px; color: #FFFFFF; text-align: center;">单曲循环</view>
								<view v-if="next2" style="font-size: 14px; color: #FFFFFF; text-align: center;">随机播放</view>
								<view v-if="next3" style="font-size: 14px; color: #FFFFFF; text-align: center;">顺序播放</view>
							</view>
							<!-- 播放列表 -->
							<view @click="toPlaylist" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%; margin-top: 9rpx;">
								<image src="@/static/music/play_list.png" style="width: 60rpx; height: 60rpx; margin-left: 18rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">播放列表</view>
							</view>
							<!-- 更多 -->
							<view @click="toMore" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%;">
								<image src="@/static/music/more.png" style="width: 68rpx; height: 68rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">更多</view>
							</view>
						</view>
						<!-- 进度条 -->
						<view @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" style="display: flex; flex-direction: column; height: 160rpx;">
							<!-- 底座进度条 -->
							<view style="width: 85%; margin-top: 70rpx; height: 5.8rpx; border-radius: 20rpx; margin-left: 6.5%; background-color: #FFFFFF; opacity: 0.5;"></view>
							<!-- 未触摸 -->
							<view v-if="!disableTouch" style="width: 85%; position: absolute; z-index: 1003; margin-top: 70rpx; margin-left: 6.5%;">
								<!-- 1.白底 没有触摸的时候的进度条 -->
								<view :style="'width: '+ endper +'%; height: 5.8rpx; border-radius: 20rpx; background-color: #FFFFFF;'"></view>
								<!-- 2.白底 圆圈的小点 -->
								<view :style="'margin-left: '+ (endper - 1) +'%; width: 16rpx; height: 16rpx; margin-top: -10rpx; background-color: #FFFFFF; border-radius: 30rpx; position: absolute; z-index: 1004;'"></view>
							</view>
							<!-- 触摸 -->
							<view v-if="disableTouch" style="width: 85%; position: absolute; z-index: 1003; margin-top: 70rpx; margin-left: 6.5%;">
								<view :style="'width: '+ percent +'%; height: 5.8rpx; border-radius: 20rpx; background-color: #FFFFFF;'"></view>
								<view :style="'margin-left: '+ (percent - 1) +'%; width: 16rpx; height: 16rpx; margin-top: -10rpx; background-color: #FFFFFF; border-radius: 30rpx; position: absolute; z-index: 1004;'"></view>
							</view>
							<!-- 不触摸 -->
							<view v-if="!disableTouch" style="display: flex; flex-direction: row;">
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; left: 6%; margin-top: 20rpx;">{{nowtime}}</view>
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; right: 9%; margin-top: 20rpx;">{{totaltime}}</view>
							</view>
							<!-- 触摸 -->
							<view v-if="disableTouch" style="display: flex; flex-direction: row;">
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; left: 6%; margin-top: 20rpx;">{{nowtimeX}}</view>
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; right: 9%; margin-top: 20rpx;">{{totaltime}}</view>
							</view>
						</view>
						<!-- 播放器 -->
						<view style="display: flex; flex-direction: row; margin-top: 10rpx;">
							<image @click="beforeMusic" src="@/static/music/before.png" style="width: 100rpx; height: 100rpx; margin-left: 14%;"></image>
							<image v-if="isplay" @click="plays" src="@/static/music/play.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
							<image v-if="!isplay" @click="plays" src="@/static/music/pause.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
							<image @click="nextMusic" src="@/static/music/next.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
						</view>
					</view>
				</block>
			</swiper-item>
			<swiper-item>
				<!-- 歌词 -->
				<view style="width: 100%; height: 100%;" v-show="showitem">
					<view style="width: 100%; opacity: 0;">.</view>
					<image v-if="showLoadLrc" @click="showCloseLrc" src="@/static/music/jump.png" style="width: 100rpx; height: 100rpx; position: absolute; z-index: 100009; bottom: 20rpx; right: 50rpx; opacity: 0.3;"></image>
					<image v-if="!showLoadLrc" @click="showLrc" src="@/static/music/chacha.png" style="width: 100rpx; height: 100rpx; position: absolute; z-index: 100009; bottom: 20rpx; right: 50rpx; opacity: 0.3;"></image>
					<view style=" width: 100%; height: 100%; mask-image: linear-gradient(to bottom, transparent, transparent 0%, black 10%);">
						<view style=" width: 100%; height: 100%; mask-image: linear-gradient(to top, transparent, transparent 10%, black 35%);">
							<scroll-view v-show="showLoadLrc===true" style="margin-top: 10rpx; width: 100%; height: 100%; margin-left: 8%;" :scroll-into-view="scrollIntoView" :scroll-y="true" :scroll-with-animation="true">
								<view style="width: 100%; height: 150px;"></view>
								<block v-for="(list,index) in lrc" :key="index">
									<view :id="list.place" style="width: 100%; height: 1px;"></view>
									<view @click="toJump(index)" :style="'width: 85%; font-size: 26px; font-weight: bold; color: #FFFFFF; margin-top: 80rpx; opacity: 0.4; transform: translateY(150px); word-wrap:break-word;'+list.animations" :class="(index>Number(scrollIntoView.split('place')[1])&&(index-Number(scrollIntoView.split('place')[1]))<9)?'anima-'+(index-Number(scrollIntoView.split('place')[1])+1):''">
										{{list.lineLyric}}
									</view>
								</block>
								<view style="width: 100%; height: 600rpx;"></view>
							</scroll-view>
							<scroll-view v-show="showLoadLrc===false" style="margin-top: 10rpx; width: 100%; height: 100%; margin-left: 8%;" :scroll-y="true" :scroll-with-animation="true">
								<view style="width: 100%; height: 20px;"></view>
								<block v-for="(list,index) in content">
									<view style="width: 85%; margin-top: 60rpx; display: flex; flex-direction: row;">
										<image v-if="list.u_pic !== ''" :src="list.u_pic" mode="aspectFill" style="width: 100rpx; height: 100rpx; border-radius: 100px;"></image>
										<image v-if="list.u_pic.length == 0" src="@/static/music.png" mode="aspectFill" style="width: 100rpx; height: 100rpx; border-radius: 100px;"></image>
										<view style="width: 80%; margin-left: 30rpx; margin-top: 10rpx; display: flex; flex-direction: column;">
											<view style="width: 100%; font-size: 16px; font-weight: bold; color: #FFFFFF; opacity: 0.6; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
												{{list.u_name}}
											</view>
											<view style="width: 95%; font-size: 17px; font-weight: bold; color: #FFFFFF; opacity: 0.98;">
												{{list.msg}}
											</view>
										</view>
									</view>
								</block>
								<block v-if="content.length == 0">
									<view style="width: 200rpx; height: 80rpx; border: 1px #FFFFFF solid; border-radius: 80rpx; margin-top: 100rpx; margin-left: 28%; opacity: 0.6;">
										<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 20rpx;">没有评论</view>
									</view>
								</block>
								<block v-if="content.length !== 0">
									<view @click="getMore" style="width: 200rpx; height: 80rpx; border: 1px #FFFFFF solid; border-radius: 80rpx; margin-top: 100rpx; margin-left: 28%; opacity: 0.6;">
										<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 20rpx;">获取更多</view>
									</view>
								</block>
								<view style="width: 100%; height: 600rpx;"></view>
							</scroll-view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<!-- 1.顶部菜单 -->
		<view style="display: flex; flex-direction: row;">
			<image @click="close" src="@/static/music/low.png" style="width: 50rpx; height: 44rpx; margin-left: 60rpx; margin-top: 40rpx;"></image>
			<view style="display: flex; flex-direction: row; margin-left: 25%; margin-top: 35rpx;">
				<view @click="gequ" :style="'font-size: 16px; font-weight: bold; color: #FFFFFF; opacity: '+ opc1 +';'">歌曲</view>
				<view style="font-size: 14px; color: #FFFFFF; opacity: 0.5;">｜</view>
				<view @click="geci" :style="'font-size: 16px; font-weight: bold; color: #FFFFFF; opacity: '+ opc2 +';'">歌词</view>
			</view>
		</view>
		<!-- 2.内容部分 -->
		<swiper :style="'width: 100%; height: '+ (screenHeight*0.72) +'px; position: absolute; margin-top: 30rpx;'" :current="current" @change="swithChange" :disable-touch="disableTouch">
			<swiper-item>
				<scroll-view :style="'width: 100%; height: '+ (screenHeight*0.74) +'px; mask-image: linear-gradient(to top, transparent, transparent 3%, black 10%);'" :scroll-y="true">
					<view style="width: 100%; height: 100%;">
						<!-- 图片 -->
						<view id="a1" style="width: 650rpx; height: 650rpx; margin-top: 60rpx; margin-left: 6.5%;">
							<image mode="aspectFill" :src="pic" style="width: 100%; height: 100%; border-radius: 20rpx; box-shadow: 0upx 0upx 2upx #f9f8ff;"></image>
						</view>
						<!-- 歌手信息 -->
						<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 6.5%;">
							<view style="display: flex; flex-direction: column;">
								<view style="width: 500rpx; font-size: 28px; font-weight: bold; color: #fefcff; background-color: transparent; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
									{{title}}
								</view>
								<view style="width: 500rpx; font-size: 18px; font-weight: bold; color: #fefcff; margin-top: 10rpx; background-color: transparent; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
									{{author}}
								</view>
							</view>
							<!-- 爱心 -->
							<view style="margin-left: 65rpx; display: flex; flex-direction: column;">
								<image v-if="!islike" @click="like" src="@/static/music/no_like.png" style="width: 80rpx; height: 80rpx; opacity: 0.8;"></image>
								<image v-if="islike" @click="like" src="@/static/music/like.png" style="width: 80rpx; height: 80rpx; opacity: 0.8;"></image>
								<view style="font-size: 16px; color: #FFFFFF; text-align: center; margin-top: 15rpx; opacity: 0.9;">喜欢</view>
							</view>
						</view>
						<!-- 信息栏 -->
						<view style="display: flex; flex-direction: row; margin-top: 60rpx; margin-left: 6.5%;">
							<!-- 下载 -->
							<view id="a2" @click="download" style="display: flex; flex-direction: column; opacity: 0.8; margin-top: 7rpx;">
								<image src="@/static/music/download.png" style="width: 65rpx; height: 65rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">下载</view>
							</view>
							<!-- 歌曲循环设置 -->
							<view @click="nextCircle" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%;">
								<image v-if="next1" src="@/static/music/one_circle.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<image v-if="next2" src="@/static/music/luan_play.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<image v-if="next3" src="@/static/music/next_play.png" style="width: 70rpx; height: 70rpx; margin-left: 15rpx;"></image>
								<view v-if="next1" style="font-size: 14px; color: #FFFFFF; text-align: center;">单曲循环</view>
								<view v-if="next2" style="font-size: 14px; color: #FFFFFF; text-align: center;">随机播放</view>
								<view v-if="next3" style="font-size: 14px; color: #FFFFFF; text-align: center;">顺序播放</view>
							</view>
							<!-- 播放列表 -->
							<view @click="toPlaylist" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%; margin-top: 9rpx;">
								<image src="@/static/music/play_list.png" style="width: 60rpx; height: 60rpx; margin-left: 18rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">播放列表</view>
							</view>
							<!-- 更多 -->
							<view @click="toMore" style="display: flex; flex-direction: column; opacity: 0.8; margin-left: 13.8%;">
								<image src="@/static/music/more.png" style="width: 68rpx; height: 68rpx;"></image>
								<view style="font-size: 14px; color: #FFFFFF; text-align: center;">更多</view>
							</view>
						</view>
						<!-- 进度条 -->
						<view @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" style="display: flex; flex-direction: column; height: 160rpx;">
							<!-- 底座进度条 -->
							<view style="width: 85%; margin-top: 70rpx; height: 5.8rpx; border-radius: 20rpx; margin-left: 6.5%; background-color: #FFFFFF; opacity: 0.5;"></view>
							<!-- 未触摸 -->
							<view v-if="!disableTouch" style="width: 85%; position: absolute; z-index: 1003; margin-top: 70rpx; margin-left: 6.5%;">
								<!-- 1.白底 没有触摸的时候的进度条 -->
								<view :style="'width: '+ endper +'%; height: 5.8rpx; border-radius: 20rpx; background-color: #FFFFFF;'"></view>
								<!-- 2.白底 圆圈的小点 -->
								<view :style="'margin-left: '+ (endper - 1) +'%; width: 16rpx; height: 16rpx; margin-top: -10rpx; background-color: #FFFFFF; border-radius: 30rpx; position: absolute; z-index: 1004;'"></view>
							</view>
							<!-- 触摸 -->
							<view v-if="disableTouch" style="width: 85%; position: absolute; z-index: 1003; margin-top: 70rpx; margin-left: 6.5%;">
								<view :style="'width: '+ percent +'%; height: 5.8rpx; border-radius: 20rpx; background-color: #FFFFFF;'"></view>
								<view :style="'margin-left: '+ (percent - 1) +'%; width: 16rpx; height: 16rpx; margin-top: -10rpx; background-color: #FFFFFF; border-radius: 30rpx; position: absolute; z-index: 1004;'"></view>
							</view>
							<!-- 不触摸 -->
							<view v-if="!disableTouch" style="display: flex; flex-direction: row;">
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; left: 6%; margin-top: 20rpx;">{{nowtime}}</view>
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; right: 9%; margin-top: 20rpx;">{{totaltime}}</view>
							</view>
							<!-- 触摸 -->
							<view v-if="disableTouch" style="display: flex; flex-direction: row;">
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; left: 6%; margin-top: 20rpx;">{{nowtimeX}}</view>
								<view style="font-size: 13px; color: #FFFFFF; position: absolute; right: 9%; margin-top: 20rpx;">{{totaltime}}</view>
							</view>
						</view>
						<!-- 播放器 -->
						<view style="display: flex; flex-direction: row; margin-top: 10rpx;">
							<image @click="beforeMusic" src="@/static/music/before.png" style="width: 100rpx; height: 100rpx; margin-left: 14%;"></image>
							<image v-if="isplay" @click="plays" src="@/static/music/play.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
							<image v-if="!isplay" @click="plays" src="@/static/music/pause.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
							<image @click="nextMusic" src="@/static/music/next.png" style="width: 100rpx; height: 100rpx; margin-left: 15%;"></image>
						</view>
					</view>
					<view style="width: 100%; height: 300rpx;"></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<!-- 歌词 -->
				<view style="width: 100%; height: 100%;" v-show="showitem">
					<view style="width: 100%; opacity: 0;">.</view>
					<image v-if="showLoadLrc" @click="showCloseLrc" src="@/static/music/jump.png" style="width: 100rpx; height: 100rpx; position: absolute; z-index: 100009; bottom: 20rpx; right: 50rpx; opacity: 0.3;"></image>
					<image v-if="!showLoadLrc" @click="showLrc" src="@/static/music/chacha.png" style="width: 100rpx; height: 100rpx; position: absolute; z-index: 100009; bottom: 20rpx; right: 50rpx; opacity: 0.3;"></image>
					<view style=" width: 100%; height: 100%; mask-image: linear-gradient(to bottom, transparent, transparent 0%, black 10%);">
						<view style=" width: 100%; height: 100%; mask-image: linear-gradient(to top, transparent, transparent 10%, black 35%);">
							<scroll-view v-show="showLoadLrc===true" style="margin-top: 10rpx; width: 100%; height: 100%; margin-left: 8%;" :scroll-into-view="scrollIntoView" :scroll-y="true" :scroll-with-animation="true">
								<view style="width: 100%; height: 150px;"></view>
								<block v-for="(list,index) in lrc" :key="index">
									<view :id="list.place" style="width: 100%; height: 1px;"></view>
									<view @click="toJump(index)" :style="'width: 85%; font-size: 26px; font-weight: bold; color: #FFFFFF; margin-top: 80rpx; opacity: 0.4; transform: translateY(150px); word-wrap:break-word;'+list.animations" :class="(index>Number(scrollIntoView.split('place')[1])&&(index-Number(scrollIntoView.split('place')[1]))<9)?'anima-'+(index-Number(scrollIntoView.split('place')[1])+1):''">
										{{list.lineLyric}}
									</view>
								</block>
								<view style="width: 100%; height: 600rpx;"></view>
							</scroll-view>
							<scroll-view v-show="showLoadLrc===false" style="margin-top: 10rpx; width: 100%; height: 100%; margin-left: 8%;" :scroll-y="true" :scroll-with-animation="true">
								<view style="width: 100%; height: 20px;"></view>
								<block v-for="(list,index) in content">
									<view style="width: 85%; margin-top: 60rpx; display: flex; flex-direction: row;">
										<image v-if="list.u_pic !== ''" :src="list.u_pic" mode="aspectFill" style="width: 100rpx; height: 100rpx; border-radius: 100px;"></image>
										<image v-if="list.u_pic.length == 0" src="@/static/music.png" mode="aspectFill" style="width: 100rpx; height: 100rpx; border-radius: 100px;"></image>
										<view style="width: 80%; margin-left: 30rpx; margin-top: 10rpx; display: flex; flex-direction: column;">
											<view style="width: 100%; font-size: 16px; font-weight: bold; color: #FFFFFF; opacity: 0.6; text-overflow: ellipsis; -o-text-overflow: ellipsis; overflow: hidden; white-space: wrap; -webkit-line-clamp: 1; display: -webkit-box; -webkit-box-orient: vertical;">
												{{list.u_name}}
											</view>
											<view style="width: 95%; font-size: 17px; font-weight: bold; color: #FFFFFF; opacity: 0.98;">
												{{list.msg}}
											</view>
										</view>
									</view>
								</block>
								<block v-if="content.length == 0">
									<view style="width: 200rpx; height: 80rpx; border: 1px #FFFFFF solid; border-radius: 80rpx; margin-top: 100rpx; margin-left: 28%; opacity: 0.6;">
										<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 20rpx;">没有评论</view>
									</view>
								</block>
								<block v-if="content.length !== 0">
									<view @click="getMore" style="width: 200rpx; height: 80rpx; border: 1px #FFFFFF solid; border-radius: 80rpx; margin-top: 100rpx; margin-left: 28%; opacity: 0.6;">
										<view style="font-size: 14px; font-weight: bold; color: #FFFFFF; text-align: center;padding-top: 20rpx;">获取更多</view>
									</view>
								</block>
								<view style="width: 100%; height: 600rpx;"></view>
							</scroll-view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- #endif -->
		<uni-popup type="bottom" ref="playlist">
			<view :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.8) +'px;'">
				<playlist></playlist>
			</view>
		</uni-popup>
		<uni-popup type="bottom" ref="more">
			<view :style="'width: '+ windowWidth +'px; height: '+ (screenHeight*0.22) +'px;'">
				<more></more>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="msg1">
			<view style="font-size: 16px; font-weight: bold; color: #FFFFFF;">没有更多了</view>
		</uni-popup>
		<uni-popup type="center" ref="msg2">
			<view style="font-size: 16px; font-weight: bold; color: #FFFFFF;">加载中...</view>
		</uni-popup>
		<uni-popup type="center" ref="msgx">
			<view style="width: 490rpx; height: 350rpx; margin-top: -50rpx; border-radius: 10rpx; background-color: #FFFFFF;">
				<view style="font-size: 18px; font-weight: bold; text-align: center; padding-top: 20rpx;">提醒信息</view>
				<view style="font-size: 14px; text-align: center; padding-top: 50rpx; width: 330rpx; margin-left: 60rpx;">链接已复制到剪贴板，链接有时效性，请尽快下载！</view>
				<view style="display: flex; flex-direction: row; margin-top: 50rpx; margin-left: 20rpx;">
					<view @click="closemsgx" style="font-size: 16px; font-weight: bold; color: #999999; margin-left: 95rpx;">取消</view>
					<view @click="closemsgx" style="font-size: 16px; font-weight: bold; color: #007AFF; margin-left: 95rpx;">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import helangBlur from "../helang-blur/helang-blur.vue";
	import playlist from './playlist.vue';
	import more from './more.vue';
	export default {
		name:"Music",
		data() {
			return {
				safearea: 0,
				windowWidth: 0,
				screenHeight: 0,
				current: 0,
				opc1: 1,
				opc2: 0.6,
				isplay: false,//默认没有播放
				islike: false,//默认不喜欢
				disableTouch: false,//默认没有触摸
				percent: 0,
				endper: 0,
				isToFlag: true,
				nowtime: '',
				nowtimeX: '',
				totaltime: '',
				
				author: "",//作者
				lrc: "",//歌词
				pic: "",//封面
				pre_url: "",//预览链接
				title: "",//歌曲名称
				url: "",//歌曲链接
				
				next1: true,
				next2: false,
				next3: false,
				
				baseurl: '',
				
				platform: "",
				
				params:{
					width: uni.getSystemInfoSync().windowWidth + 'px',
					height: uni.getSystemInfoSync().screenHeight + 'px',
					image: this.$musicInfo.pic,
					blur: "xl"
				},
				
				newtime: 0,
				scrollIntoView: "",
				
				showLoadLrc: true,//默认展示加载中的歌词
				showitem: false,
				
				iscreated: false,//控制退出界面循环不重复，节省性能
				lrcshows: false,
				
				contentPage: 1,
				content: [],//评论内容
				cont: [],
			};
		},
		components:{
			playlist,more,helangBlur
		},
		created() {
			this.iscreated = true;
			this.contentPage = 1;
			this.content = [];
			this.cont = [];
			// #ifdef APP
			this.safearea = uni.getSystemInfoSync().safeArea.top;
			// #endif
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			this.windowWidth = uni.getSystemInfoSync().windowWidth;
			this.platform = uni.getSystemInfoSync().platform;
			this.baseurl = this.$nodeurl;
			this.percent = 0;
			this.endper = 0;
			this.nowtime = '00:00';
			this.totaltime = '00:00';
			// console.log(this.screenHeight)
			this.nowtime = this.$timeobj.nowtime;
			this.totaltime = this.$timeobj.totaltime;
			if(this.$isplay){
				this.isplay = true;
				this.perCircle();
			} else {
				this.isplay = false;
			}
			this.author = this.$musicInfo.author;
			let lrc = this.$musicInfo.lrc;
			for(let j=0;j<lrc.length;j++){
				lrc[j].place = "place" + j;
				lrc[j].animations = "";
			}
			this.lrc = lrc;
			this.pic = this.$musicInfo.pic;
			this.pre_url = this.$musicInfo.pre_url;
			this.title = this.$musicInfo.title;
			this.url = this.$musicInfo.url;
			this.getContent();//获取评论
			this.next1 = uni.getStorageSync("next").next1;
			this.next2 = uni.getStorageSync("next").next2;
			this.next3 = uni.getStorageSync("next").next3;
			uni.$on('info', (data)=>{
				this.contentPage = 1;
				this.content = [];
				this.cont = [];
				this.author = data.author;
				let lrc = data.lrc;
				for(let j=0;j<lrc.length;j++){
					lrc[j].place = "place" + j;
					lrc[j].animations = "";
				}
				this.lrc = data.lrc;
				this.pic = data.pic;
				this.pre_url = data.pre_url;
				this.title = data.title;
				this.url = data.url;
				this.getContent();//获取评论
			})
			uni.$on('isplay', (data)=>{
				this.isplay = data.isplay;
				if(this.isplay){
					this.perCircle();
				}
			})
			uni.$on('close_playlist', ()=>{
				this.$refs.playlist.close();
			})
			if(this.platform !== 'ios'){
				uni.$on('update_image', ()=>{
					this.params.image = this.$musicInfo.pic;
				})
			}
			uni.$on('close_more', ()=>{
				this.$refs.more.close();
			})
			let username = uni.getStorageSync("username");
			uni.request({
				url: this.baseurl + '/getUserMusic',
				method: 'POST',
				data:{
					username: username
				},
				success: (res) => {
					let list = res.data.value[0].list;
					let info = 0;
					for(let i=0;i<list.length;i++){
						if(list[i].pre_url === this.$musicInfo.pre_url){
							this.islike = true;
						}
					}
				}
			})
		},
		destroyed() {
			this.iscreated = false;
			this.contentPage = 1;
			this.content = [];
			this.cont = [];
			uni.$off('close_playlist');
			uni.$off('close_more');
		},
		methods:{
			getMore(){
				this.$refs.msg2.open('center');
				let str = this.$musicInfo.pre_url;
				let mid = str.split('mid=')[1];
				this.contentPage++;
				uni.request({
					url: this.$pythonurl + '/kuwo/comment?sid='+ mid +'&type=get_rec_comment&page='+ this.contentPage +'&rows=30&digest=15',
					method: 'GET',
					success: (res) => {
						this.$refs.msg2.close();
						let rows = res.data.rows;
						if(rows !== undefined){
							this.cont = rows;
							for(let i=0;i<rows.length;i++){
								this.content.push(rows[i]);
							}
						} else {
							this.$refs.msg1.open('center');
							setTimeout(()=>{
								this.$refs.msg1.close();
							},2000)
						}
					},
					fail: () => {
						this.contentPage--;
					}
				})
				setTimeout(()=>{
					this.$refs.msg2.close();
				},2000)
			},
			getContent(){
				let str = this.$musicInfo.pre_url;
				let mid = str.split('mid=')[1]
				uni.request({
					url: this.$pythonurl + '/kuwo/comment?sid='+ mid +'&type=get_rec_comment&page='+ this.contentPage +'&rows=30&digest=15',
					method: 'GET',
					success: (res) => {
						let rows = res.data.rows;
						if(rows !== undefined){
							for(let i=0;i<rows.length;i++){
								this.content.push(rows[i]);
							}
						}
					}
				})
			},
			geci(){
				this.current = 1;
				this.showitem = true;
			},
			gequ(){
				setTimeout(()=>{
					this.current = 0;
					this.showitem = false;
				},80)
			},
			toJump(index){
				let seek = parseInt( Number( this.lrc[index].time ) );
				// console.log(seek);
				this.$audio.seek(seek);
				this.showLoadLrc = true;
				this.$audio.play();
				let animation = "opacity: 1; filter: blur(0px); -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards;";
				this.lrc[index].animations = animation;
				for(let i=0;i<this.lrc.length;i++){
					if(i !== index){
						this.lrc[i].animations = "";
					}
				}
			},
			showCloseLrc(){
				this.showLoadLrc = false;
			},
			showLrc(){
				this.showLoadLrc = true;
			},
			closemsgx(){
				this.$refs.msgx.close()
			},
			download(){
				uni.setClipboardData({
				    data: this.url,
					success: () => {
						uni.hideToast()
					}
				})
				this.$refs.msgx.open('center')
			},
			toMore(){
				this.$refs.more.open('bottom')
			},
			toPlaylist(){
				this.$refs.playlist.open('bottom')
			},
			nextMusic(){
				if(uni.getStorageSync('music').length !== 0){
					let music = uni.getStorageSync('music');
					if(music.length == 1){
						this.$refs.msg1.open('center');
						setTimeout(()=>{
							this.$refs.msg1.close();
						},800)
					} else {
						let info = 0;
						for(let i=0;i<music.length;i++){
							if(music[i].isclick){
								info = i;
							}
						}
						if(info == music.length-1){
							this.$refs.msg2.open('center');
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
									uni.$emit('updateTabbar')
									uni.$emit('info', {
										author: music[0].author,
										lrc: music[0].lrc,
										pic: music[0].pic,
										pre_url: music[0].pre_url,
										title: music[0].title,
										url: music[0].url
									})
									this.$musicInfo.author = music[0].author;
									this.$musicInfo.lrc = music[0].lrc;
									this.$musicInfo.pic = music[0].pic;
									this.$musicInfo.pre_url = music[0].pre_url;
									this.$musicInfo.title = music[0].title;
									this.$musicInfo.url = music[0].url;
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
																		this.$refs.msg2.close();
																		var savedFilePath = req.savedFilePath;
																		this.params.image = this.$musicInfo.pic;
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
										this.$refs.msg2.close();
										this.$audio.src = this.$musicInfo.url;
										this.$audio.play();
									}
									// #endif
									// #ifdef H5
									this.$refs.msg2.close();
									this.$audio.src = this.$musicInfo.url;
									this.$audio.play();
									// #endif
								}
							})
						} else {
							this.$refs.msg2.open('center');
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
									this.$musicInfo.author = music[info+1].author;
									this.$musicInfo.lrc = music[info+1].lrc;
									this.$musicInfo.pic = music[info+1].pic;
									this.$musicInfo.pre_url = music[info+1].pre_url;
									this.$musicInfo.title = music[info+1].title;
									this.$musicInfo.url = music[info+1].url;
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
																		this.$refs.msg2.close();
																		var savedFilePath = req.savedFilePath;
																		this.params.image = this.$musicInfo.pic;
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
										this.$refs.msg2.close();
										this.$audio.src = this.$musicInfo.url;
										this.$audio.play();
									}
									// #endif
									// #ifdef H5
									this.$refs.msg2.close();
									this.$audio.src = this.$musicInfo.url;
									this.$audio.play();
									// #endif
								}
							})
						}
					}
				}
			},
			beforeMusic(){
				if(uni.getStorageSync('music').length !== 0){
					let music = uni.getStorageSync('music');
					if(music.length == 1){
						this.$refs.msg1.open('center');
						setTimeout(()=>{
							this.$refs.msg1.close();
						},800)
					} else {
						let ins = 0;
						for(let i=0;i<music.length;i++){
							if(music[i].isclick){
								ins = i;
							}
						}
						if(ins == 0){
							this.$refs.msg2.open('center');
							uni.request({
								url: music[music.length-1].pre_url,
								method: 'GET',
								success: (res) => {
									let data = res.data.data;
									music[music.length-1].url = data.url;
									music[music.length-1].isclick = true;
									for(let j=0;j<music.length;j++){
										if(j !== music.length-1){
											music[j].isclick = false;
										}
									}
									uni.setStorageSync('music', music);
									uni.$emit('updateTabbar')
									uni.$emit('info', {
										author: music[music.length-1].author,
										lrc: music[music.length-1].lrc,
										pic: music[music.length-1].pic,
										pre_url: music[music.length-1].pre_url,
										title: music[music.length-1].title,
										url: music[music.length-1].url
									})
									this.$musicInfo.author = music[music.length-1].author;
									this.$musicInfo.lrc = music[music.length-1].lrc;
									this.$musicInfo.pic = music[music.length-1].pic;
									this.$musicInfo.pre_url = music[music.length-1].pre_url;
									this.$musicInfo.title = music[music.length-1].title;
									this.$musicInfo.url = music[music.length-1].url;
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
																		this.$refs.msg2.close();
																		var savedFilePath = req.savedFilePath;
																		this.params.image = this.$musicInfo.pic;
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
										this.$refs.msg2.close();
										this.$audio.src = this.$musicInfo.url;
										this.$audio.play();
									}
									// #endif
									// #ifdef H5
									this.$refs.msg2.close();
									this.$audio.src = this.$musicInfo.url;
									this.$audio.play();
									// #endif
								}
							})
						} else {
							this.$refs.msg2.open('center');
							uni.request({
								url: music[ins-1].pre_url,
								method: 'GET',
								success: (res) => {
									let data = res.data.data;
									music[ins-1].url = data.url;
									music[ins-1].isclick = true;
									for(let j=0;j<music.length;j++){
										if(j !== ins-1){
											music[j].isclick = false;
										}
									}
									uni.setStorageSync('music', music);
									uni.$emit('updateTabbar')
									uni.$emit('info', {
										author: music[ins-1].author,
										lrc: music[ins-1].lrc,
										pic: music[ins-1].pic,
										pre_url: music[ins-1].pre_url,
										title: music[ins-1].title,
										url: music[ins-1].url
									})
									this.$musicInfo.author = music[ins-1].author;
									this.$musicInfo.lrc = music[ins-1].lrc;
									this.$musicInfo.pic = music[ins-1].pic;
									this.$musicInfo.pre_url = music[ins-1].pre_url;
									this.$musicInfo.title = music[ins-1].title;
									this.$musicInfo.url = music[ins-1].url;
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
																		this.$refs.msg2.close();
																		var savedFilePath = req.savedFilePath;
																		this.params.image = this.$musicInfo.pic;
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
										this.$refs.msg2.close();
										this.$audio.src = this.$musicInfo.url;
										this.$audio.play();
									}
									// #endif
									// #ifdef H5
									this.$refs.msg2.close();
									this.$audio.src = this.$musicInfo.url;
									this.$audio.play();
									// #endif
								}
							})
						}
					}
				}
			},
			nextCircle(){
				if(this.next1 && !this.next2 && !this.next3){
					this.next1 = false;
					this.next2 = true;
					this.next3 = false;
					uni.setStorageSync("next", {
						next1: false,
						next2: true,
						next3: false
					})
				} else if(!this.next1 && this.next2 && !this.next3){
					this.next1 = false;
					this.next2 = false;
					this.next3 = true;
					uni.setStorageSync("next", {
						next1: false,
						next2: false,
						next3: true
					})
				} else if(!this.next1 && !this.next2 && this.next3){
					this.next1 = true;
					this.next2 = false;
					this.next3 = false;
					uni.setStorageSync("next", {
						next1: true,
						next2: false,
						next3: false
					})
				}
			},
			touchend(){
				this.endper = this.percent;
				this.nowtime = this.nowtimeX;
				let seek = parseInt( (this.endper/100) * this.$duration );
				this.$audio.seek( Number(seek) );
				// 处理进度条调频问题
				this.isToFlag = false;
				setTimeout(()=>{
					this.disableTouch = false;
				},500)
			},
			touchstart(){
				this.disableTouch = true;
			},
			touchmove(e){
				let min = this.windowWidth * 0.0672;
				let max = this.windowWidth * 0.911;
				let cur = e.changedTouches[0].clientX;
				let len = max - min;
				let current = cur - min;
				let percent = current / len;
				percent = parseInt(percent*100);
				if(percent >= 0 && percent <= 100){
					let times = (totalSeconds)=>{
						const minutes = Math.floor(totalSeconds / 60);
						const seconds = totalSeconds % 60;
						function padTo2Digits(num) {
						  return num.toString().padStart(2, '0');
						}
						const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
						return result;
					}
					this.nowtimeX = times( parseInt( (percent/100) * this.$duration ) );
					this.percent = percent;
				}
			},
			perCircle(){
				if(this.iscreated){
					this.lrcshows = false;
					// 处理进度条、时间跳频问题
					if(this.isToFlag == false){
						setTimeout(()=>{
							this.endper = this.$percent;
							this.nowtime = this.$timeobj.nowtime;
							this.totaltime = this.$timeobj.totaltime;
							this.isToFlag = true;
							this.newtime = parseInt(Number(this.$currentTime));
							let lrc = this.lrc;
							for(let i=0;i<lrc.length;i++){
								let num = parseInt(Number(lrc[i].time));
								if(this.newtime > num-1 && this.newtime <= num){
									this.scrollIntoView = "place"+i;
									this.lrcshows = true;
									let animation = "opacity: 1; filter: blur(0px); -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards;";
									this.lrc[i].animations = animation;
									if(i <= lrc.length-1 && i >= 1){
										this.lrc[i-1].animations = "";
									}
								}
							}
							lrc = [];
						},500)
					} else {
						this.endper = this.$percent;
						this.nowtime = this.$timeobj.nowtime;
						this.totaltime = this.$timeobj.totaltime;
						this.newtime = parseInt(Number(this.$currentTime));
						let lrc = this.lrc;
						for(let i=0;i<lrc.length;i++){
							let num = parseInt(Number(lrc[i].time));
							if(this.newtime > num-1 && this.newtime <= num){
								this.scrollIntoView = "place"+i;
								this.lrcshows = true;
								let animation = "opacity: 1; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards;";
								this.lrc[i].animations = animation;
								if(i <= lrc.length-1 && i >= 1){
									this.lrc[i-1].animations = "";
								}
							}
						}
						lrc = [];
					}
					setTimeout(()=>{
						if(this.$isplay){
							this.perCircle();
						}
					},1000)
				}
			},
			like(){
				// console.log(uni.getStorageSync("username"))
				if(!this.islike){
					this.$refs.msg2.open('center');
					// 喜欢
					// console.log(this.$musicInfo);
					let username = uni.getStorageSync("username");
					uni.request({
						url: this.baseurl + '/getUserMusic',
						method: 'POST',
						data:{
							username: username
						},
						success: (res) => {
							let list = res.data.value[0].list;
							// console.log(list);
							let isToo = true;
							for(let i=0;i<list.length;i++){
								if(list[i].pre_url === this.$musicInfo.pre_url){
									isToo = false;
								}
							}
							if(isToo) {
								list.push(this.$musicInfo);
								uni.request({
									url: this.baseurl + '/updateUserMusic',
									method: 'POST',
									data:{
										username: username,
										list: list
									},
									success: (da) => {
										if(da.data.value === "更新成功！"){
											this.$refs.msg2.close();
											this.islike = true;
										}
									}
								})
							}
						}
					})
				} else {
					// 不喜欢
					this.$refs.msg2.open('center');
					console.log(this.$musicInfo);
					let username = uni.getStorageSync("username");
					uni.request({
						url: this.baseurl + '/getUserMusic',
						method: 'POST',
						data:{
							username: username
						},
						success: (res) => {
							let list = res.data.value[0].list;
							console.log(list);
							let info = 0;
							for(let i=0;i<list.length;i++){
								if(list[i].pre_url === this.$musicInfo.pre_url){
									info = i;
								}
							}
							let List = [];
							for(let i=0;i<list.length;i++){
								if(i !== info){
									List.push(list[i])
								}
							}
							uni.request({
								url: this.baseurl + '/updateUserMusic',
								method: 'POST',
								data:{
									username: username,
									list: List
								},
								success: (da) => {
									if(da.data.value === "更新成功！"){
										this.$refs.msg2.close();
										this.islike = false;
									}
								}
							})
						}
					})
				}
			},
			plays(){
				this.isplay = !this.isplay;
				if(this.isplay){
					this.$audio.play();
					this.perCircle();
				} else {
					this.$audio.pause();
				}
			},
			close(){
				this.showLoadLrc = true;
				uni.$emit('popshows', {
					ispop: false
				})
			},
			swithChange(e){
				switch (e.detail.current){
					case 0:
					this.opc1 = 1;
					this.opc2 = 0.6;
					this.showLoadLrc = true;
					this.showitem = false;
						break;
					case 1:
					this.opc1 = 0.6;
					this.opc2 = 1;
					this.showitem = true;
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/::-webkit-scrollbar {
		 display: none;
		 width: 0;
		 height: 0;
	}
	.imge {
		width: 100%;
		position: absolute;
		z-index: -1;
		filter: blur(5px);
		background-color: rgba(240, 238, 241, 0.7);
		overflow: hidden;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
	.imge::before {
	    content: "";
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    filter: blur(10px);
		background-color: rgba(152, 154, 158, 0.7);
	}
	.imge::after {
		content: ' ';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		filter: blur(5px);
		background-color: rgba(143, 148, 157, 0.7);
	}
	.img-back {
		width: 100%;
		position: absolute;
		z-index: -1;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
	.img-back::before {
	    content: "";
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    backdrop-filter: blur(100px);
		background-color: rgba(0, 0, 0, .18);
	}
	.helan {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 1.0);
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
	@for $i from 2 through 9 {
	    $time: ($i * 100+200) + ms;
	    .anima-#{$i} {
			transition: all 0.5s linear;
			animation-name: toTop+$i; // toBottom
			animation-duration: 0.5s; // 注释掉 会没有动画 就是帕帕一帧一帧的出来
			animation-fill-mode: both;
			animation-delay: $time;
		}
	}
	@keyframes toTop2 {
		0% {
			transform: translateY(150px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop3 {
		0% {
			transform: translateY(160px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop4 {
		0% {
			transform: translateY(170px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop5 {
		0% {
			transform: translateY(180px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop6 {
		0% {
			transform: translateY(190px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop7 {
		0% {
			transform: translateY(200px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop8 {
		0% {
			transform: translateY(210px);
		}
		100% {
			transform: translateY(150px);
		}
	}
	@keyframes toTop9 {
		0% {
			transform: translateY(220px);
		}
		100% {
			transform: translateY(150px);
		}
	}
</style>
