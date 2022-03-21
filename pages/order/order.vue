<template>
	<view>
		<h>停车场编号为：{{pid}}</h><br>
		<h>车位编号为：{{name}}</h><br>
		<h>请选择你要预定的时间</h><br>
		<view class="example-body">
			<uni-datetime-picker v-model="datetimerange" type="datetimerange" start="2021-3-20 12:00:00"
				end="2021-6-20 20:00:00" rangeSeparator="至" />
		</view>
		<h>你的车牌号：</h>
		<u--input placeholder="请输入内容" border="surround" v-model="plate_number"></u--input>
		<view>{{"你选择的初始时间是："+datetimerange[0]}}</view>
		<view>{{"你选择的结束时间是："+datetimerange[1]}}</view>
		<view>{{"价格是:"+price}}</view>
		<button @click="pay">支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plate_number: '',
				name: "",
				pid: "",
				datetimerange: ["2021-03-20 20:10:10", "2021-03-20 20:10:10"]
			};
		},
		computed: {
			price: function() {
				let start = new Date(this.datetimerange[0]);
				let end = new Date(this.datetimerange[1])
				let time = (end.getTime() - start.getTime()) / 1000 / 3600
				return time * 5.5;
			}
		},
		onLoad(e) {
			this.name = e.name,
				this.pid = e.pid
		},
		methods: {
			pay() {
				let _this = this;
				uni.request({
					url: "http://39.105.152.242:8081/order/booking",
					method: "GET",
					data: {
						"plate_number": _this.plate_number,
						"name": _this.name,
						"pid": _this.pid,
						"booking_start_time": _this.datetimerange[0],
						"booking_end_time": _this.datetimerange[1],
						"price": _this.price
					},
					header: {
						access_token: _this.$store.state.token
					},
					success(res) {
						let orderInfo = res.data.data;
						uni.showToast({
							title: res
						})
						console.log(res);
						console.log(orderInfo);
						// const jyAliPay = uni.requireNativePlugin('JY-ALIPAY')
						// jyAliPay.show({ // 发起支付
						//     if_sanbox:true, 
						//     auto_create_order_info:false,
						//     order_info:orderInfo
						// }, function (result) { // 支付完成回调
						//     console.log(result)
						//      if(result.resultStatus == '5002555')
						//      {
						//          that.vusui.msg('支付sdk出错')
						//      }else if(result.resultStatus == '9000')
						//      {
						//          //that.vusui.msg('支付成功');
						// 		 uni.switchTab({
						// 		 	url:"../myMap/myMap",
						// 			success() {
						// 				uni.showToast({
						// 					title:"支付成功"
						// 				})
						// 			}
						// 		 })

						//      }else{
						//          that.vusui.msg(result.memo)
						//      } 
						// });
						// var EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");    
						// EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: orderInfo,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								uni.switchTab({
									url: "../myMap/myMap",
									success() {
										uni.showToast({
											title: "支付成功"
										})
									}
								})
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				})


			}
		}

	}
</script>

<style lang="scss">

</style>
