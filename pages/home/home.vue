<template>
	<view>
		<view>
			<u-search shape="round" margin="20rpx" v-model="keyword" @search="search()"></u-search>
		</view>
		<view v-for="(park,index) in parks" @click="tomap(index)">
			<uni-showMap
			v-bind:name="park.name"  
			v-bind:placeDescribe="park.placeDescribe">
			<!-- src之后根据传的图片变化 -->
			<u--image src="../../static/logo.png" shape="circle" width="300rpx" height="300rpx"></u--image>
			</uni-showMap>
		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				longitude:"",
				latitude:"",
				parks:[],
				url:"",
				keyword:""
			};
		},
		computed:{
			token(){
				return this.$store.state.token;
			}
		},
		mounted() {
			let _this=this;
			//获取权限及定位信息
			// #ifdef MP-WEIXIN
			uni.authorize({
			    scope: 'scope.userLocation',
			    success() {
			        uni.getLocation({
			        		type: 'wgs84',
			        		success: function (res) {
								//存储位置信息
								_this.$data.longitude=res.longitude;
								_this.$data.latitude=res.latitude;
			        		}
			        })
			    },
				fail() {
					uni.showToast({
						title:"没有权限获取信息失败"
					})
				}
			});
			
			// #endif		
			//向后台请求地图信息
			uni.request({
				url:"http://wmmdeboke.top:8081/park/park_descride",
				method:"GET",
				data:{
					longitude:_this.longitude,
					latitude:_this.latitude
				},
				success(res) {
					//存储地图信息
					_this.parks=res.data.data;	
				},
				fail() {
					console.log("获取地图失败")
				}
			});		
		},
		methods:{
			tomap(index){
				let _this=this;
				uni.navigateTo({
					url:"../map/map?url="+_this.parks[index].url
				})
			},
			//搜索功能
			search(){
		
			}
		}
	}
</script>

<style lang="scss">

</style>
