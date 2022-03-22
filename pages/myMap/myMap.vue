<template>
	<view>
		<h class="booking" v-if='url==""'>您未预定车位</h>
		<web-view v-else :src="url"></web-view>
		<!-- <button @click="getdata">获取数据</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:""
			};
		},
		onshow(){
			let _this=this;
			uni.request({
				url:"http://wmmdeboke.top:8081/order/my_book",
				method:"GET",
				header:{
					access_token:_this.$store.state.token
				},
				success(res) {
					console.log(res)
					if(res.data.state==200){
						_this.url="http://wmmdeboke.top:8081/"+res.data.data.url+"?id="+res.data.data.parkId;
						console.log(_this.url)
					}else{
						uni.showToast({
							title:"你未预定车位，请到首页进行预定",
							icon:"none"
						})
					}
					
				}
			})
		},
		onLoad() {
			let _this=this;
			console.log(_this);
			uni.request({
				url:"http://wmmdeboke.top:8081/order/my_book",
				method:"GET",
				header:{
					access_token:_this.$store.state.token
				},
				success(res) {
					console.log(res)
					if(res.data.state==200){
						_this.url="http://wmmdeboke.top:8081/"+res.data.data.url+"?id="+res.data.data.parkId;
						console.log(_this.url)
					}else{
						uni.showToast({
							title:"你未预定车位，请到首页进行预定",
							icon:"none"
						})
					}
					
				}
			})
			
		},
		methods:{		
			
		}
		
	}
</script>

<style lang="scss">
		
	.booking{
		position: absolute;
		top: 50%;
		right: 45%;
	}
</style>
