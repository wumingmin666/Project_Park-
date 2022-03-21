<template>
	<view>
		<uni-showMap v-for="park in parks" v-bind:key="park.pid" 
		v-bind:name="park.name" 
		v-bind:picture="park.picture"
		v-bind:url="park.url" 
		v-bind:placeDescribe="park.placeDescribe"></uni-showMap>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	// import store from '@/store/index.js'
	export default {
		data() {
			return {
				longitude:"",
				latitude:"",
				parks:[],
				url:""
			};
		},
		methods:{
			//获取地图
			getmap(){
				
			}
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
					//先存储信息、展示地图
					//遍历res.data，展示其中的name、placedescrbe、获取图片
					_this.parks=res.data.data;	
					
				},
				fail() {
					console.log("获取地图失败")
				}
			});
			
		}
	}
</script>

<style lang="scss">

</style>
