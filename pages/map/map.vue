<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
				this.url="http://39.105.152.242:8081"+option.url;
			},
	}
</script>

<style lang="scss">

</style>
