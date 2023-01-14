<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(option) {
			this.src = option.src;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
