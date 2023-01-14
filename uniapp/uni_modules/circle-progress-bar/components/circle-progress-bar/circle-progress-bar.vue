<template>
	<view class="circle-progress-bar" 
	:style="{
		width: sunit(size),
		height: sunit(size),
	}">
		<view class="circle" :change:prop="animateModule.pro" :prop="cpro"
		:data-animate="animate"
		:style="{
			transform: `rotate(${start * 360 + 45}deg)`,
			border: `${sunit(border_width)} solid ${border_color}`,
		}">
		</view>
		<view class="bg" v-if="background"
		:style="{
			background: background,
		}"></view>
		<view class="border-back" v-if="border_back_color"
		:style="{
			border: `calc(${sunit(border_width)} - 1px) solid ${border_back_color}`
		}"></view>
		<view class="center">
			<slot :pro="cpro"></slot>
		</view>
	</view>
</template>

<script module="animateModule" lang="wxs">
	var Timing = {
		easeIn: function easeIn(pos) {
			return Math.pow(pos, 3);
		},
		easeOut: function easeOut(pos) {
			return Math.pow(pos - 1, 3) + 1;
		},
		easeInOut: function easeInOut(pos) {
			if ((pos /= 0.5) < 1) {
				return 0.5 * Math.pow(pos, 3);
			} else {
				return 0.5 * (Math.pow(pos - 2, 3) + 2);
			}
		},
		linear: function linear(pos) {
			return pos;
		}
	};

	//#ifdef MP
	function setTimeout(t, cb, d) {
		if (d > 0) {
			var s = getDate().getTime();
			var fn = function () {
				if (getDate().getTime() - s > d) {
					cb && cb();
				} else
					t.requestAnimationFrame(fn);
			}
			fn();
		}
		else
			cb && cb();
	}
	//#endif

	function Animation(opts) {
		opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
		opts.timing = opts.timing || 'linear';
		var delay = 17;

		function createAnimationFrame() {
			if (typeof setTimeout !== 'undefined') {
				return function(step, delay) {
					//#ifndef MP
					setTimeout(function() {
						var timeStamp = +new Date();
						step(timeStamp);
					}, delay);
					//#endif
					//#ifdef MP
					setTimeout(opts.instance, function () {
						var timeStamp = getDate()
						step(timeStamp);
					}, delay)
					//#endif
				};
			} else if (typeof requestAnimationFrame !== 'undefined') {
				return requestAnimationFrame;
			} else {
				return function(step) {
					step(null);
				};
			}
		};
		var animationFrame = createAnimationFrame();
		var startTimeStamp = null;
		var _step = function step(timestamp) {
			if (timestamp === null) {
				opts.onProcess && opts.onProcess(1);
				opts.onAnimationFinish && opts.onAnimationFinish();
				return;
			}
			if (startTimeStamp === null) {
				startTimeStamp = timestamp;
			}
			if (timestamp - startTimeStamp < opts.duration) {
				var process = (timestamp - startTimeStamp) / opts.duration;
				var timingFunction = Timing[opts.timing];
				process = timingFunction(process);

				opts.onProcess && opts.onProcess(process);
				animationFrame(_step, delay);
			} else {
				opts.onProcess && opts.onProcess(1);
				opts.onAnimationFinish && opts.onAnimationFinish();
			}
		};
		animationFrame(_step, delay);
	}

	function getPath(deg) {
		var path = '50% 50%'
		//各个锚点
		var ps = ['0% 0%', '100% 0%', '100% 100%', '0% 100%']
		var ps1 = path + ',' + ps[0]
		var ps2 = ps1 + ',' + ps[1]
		var ps3 = ps2 + ',' + ps[2]
		var ps4 = ps3 + ',' + ps[3]
		var ops = [
			function(per) { return ps1 + ',' + (per + '% 0%') },
			function(per) { return ps2 + ',' + ('100% ' + per + '%') },
			function(per) { return ps3 + ',' + (100 - per) + '% 100%' },
			function(per) { return ps4 + ',' + '0% ' + (100 - per) + '%' },
		]
		if (deg == 0) {
			return 'polygon(50% 50%, 50% 0%)'
		}
		else if (deg % 360 == 0) {
			return ''
		}
		var idx = parseInt(deg / 90) % 4
		var pdeg = deg % 90
		var per = pdeg / 90 * 100
		if(ops[idx]) {
			return 'polygon(' + ops[idx](per) + ')'
		}
		else {
			return ''
		}
	}

	function setDeg(newValue, oldValue, ownerInstance, instance) {
		var odeg = oldValue * 360
		var deg = newValue * 360
		var offset = deg - odeg
		
		var ds = instance.getDataset()
		if(!ds.animate) {
			var path = getPath(deg)
			instance.setStyle({
				'clip-path': path,
			})
			return
		}
		Animation({
			instance: ownerInstance,
			timing: 'easeInOut',
			duration: 300,
			onProcess: function onProcess(process) {
				var pdeg = odeg + process * offset
				var path = getPath(pdeg)
				var com = ownerInstance.selectComponent('.circle');
				com.setStyle({
					'clip-path': path,
				})
			},
			onAnimationFinish: function onAnimationFinish() {}
		});
	}
	module.exports = {
		pro: setDeg,
	}
</script>

<script>
	export default {
		props: {
			pro: {
				type: Number,
				default: 0
			},
			//起始位置 0-1
			start: {
				type: Number,
				default: 0,
			},
			//圆形大小
			size: {
				type: Number,
				default: 200
			},
			//线宽度
			border_width: {
				type: Number,
				default: 20
			},
			//线颜色
			border_color: {
				type: String,
				default: '#07C160',
			},
			//线背景色
			border_back_color: {
				type: String,
			},
			//中心内容背景色
			background: {
				type: String,
			},
			//单位
			unit: {
				type: String,
				default: 'rpx',
			},
			//是否启用动画
			animate:{
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				cpro: 0,
			}
		},
		watch: {
			pro(val) {
				this.cpro = val
			}
		},
		mounted() {
			this.cpro = this.pro
		},
		methods: {
			sunit(num) {
				if(typeof num === 'number') {
					return num + this.unit
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.circle-progress-bar{
		position: relative;
	}
	.circle, .bg, .border-back {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		position: absolute;
		box-sizing: border-box;
	}
	.circle{
		z-index: 1;
	}
	.border-back{
		height: calc(100% - 1px);
		width: calc(100% - 1px);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.point {
		position: absolute;
		border-radius: 50%;
		z-index: 1;
	}
	.center{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}
</style>
