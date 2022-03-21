<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<uni-loginapp></uni-loginapp>
		<!-- #endif -->
		
		
		<!-- #ifdef MP-WEIXIN -->
		<uni-loginwx></uni-loginwx>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
