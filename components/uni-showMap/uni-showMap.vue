<template>
	<view>
		<div>
			<h>name:{{name}}</h><br>
			<h>placeDescribe:{{placeDescribe}}</h><br>
			<h>picture:{{picture}}</h><br>
			<a>{{url}}</a><br>
			<button @click="tomap">进入地图</button>
			<h>--------------------------</h>
		</div>
	</view>
</template>

<script>
	export default {
		name:"uni-showMap",
		data() {
			return {
				
			};
		},
		props: ['name','placeDescribe','picture','url'],
		methods:{
				
			tomap(){
				let _this=this;
				uni.navigateTo({
					url:"../../pages/map/map?url="+_this.url
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
