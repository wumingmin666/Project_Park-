<template>
	<view>
		<view class="order-top">
			<view class="tip">
				<u--text text="填写订单信息" type="primary" size="30"></u--text>
			</view>
			<view class="time">
				<u-tag text="请选择你要预定的时间" shape="circle" type="primary" plain plainFill></u-tag>
				<uni-datetime-picker class="put" v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
			</view>
			<view class="plate_number">
				<u-tag text="请输入你的车牌号" shape="circle" type="primary" plain plainFill></u-tag>
				<u--input class="put" v-model="plate_number" border="surround" placeholder="请输入"></u--input>
			</view>
		</view>
		
		<view class="order-bottom">
			<view class="tip">
				<u--text text="信息及价格确认" type="primary" size="30"></u--text>
			</view>
			<view class="show">
				<u-tag :text="'您预定的车位编号为:'+name" shape="circle" type="primary" plain plainFill class="tag"></u-tag>
				<u-tag :text="'你选择的初始时间是:'+datetimerange[0]" shape="circle" type="primary" plain plainFill class="tag"></u-tag>
				<u-tag :text="'你选择的结束时间是:'+datetimerange[1]" shape="circle" type="primary" plain plainFill class="tag"></u-tag>
				<u-tag :text="'该订单的价格为:'+price" shape="circle" type="primary" plain plainFill class="tag"></u-tag>
			</view>
		</view>
		<view class="btn-pay">
			<u-button  type="primary" shape="circle" text="结算" size="large" @click="pay()"></u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				plate_number: '',
				name: "",
				pid: "",
				datetimerange: ["",""]
			};
		},
		computed: {
			price: function() {
				let time
				if(this.datetimerange[0]==""){
					return 0;
				}else{
					let start = new Date(this.datetimerange[0]);
					let end = new Date(this.datetimerange[1])
					time = (end.getTime() - start.getTime()) / 1000 / 3600
				}
				return (time * 5.5).toFixed(2);
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
						const jyAliPay = uni.requireNativePlugin('JY-ALIPAY')
						jyAliPay.show({ // 发起支付
						    if_sanbox:true, 
						    auto_create_order_info:false,
						    order_info:orderInfo
						}, function (result) { // 支付完成回调
						    console.log(result)
						     if(result.resultStatus == '5002555')
						     {
						         that.vusui.msg('支付sdk出错')
						     }else if(result.resultStatus == '9000')
						     {
						         //that.vusui.msg('支付成功');
								 uni.switchTab({
								 	url:"../myMap/myMap",
									success() {
										uni.showToast({
											title:"支付成功"
										})
									}
								 })

						     }else{
						         that.vusui.msg(result.memo)
						     } 
						});
						// var EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");    
						// EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
						// uni.requestPayment({
						// 	provider: 'alipay',
						// 	orderInfo: orderInfo,
						// 	success: function(res) {
						// 		console.log('success:' + JSON.stringify(res));
						// 		uni.switchTab({
						// 			url: "../myMap/myMap",
						// 			success() {
						// 				uni.showToast({
						// 					title: "支付成功"
						// 				})
						// 			}
						// 		})
						// 	},
						// 	fail: function(err) {
						// 		console.log('fail:' + JSON.stringify(err));
						// 	}
						// });
					}
				})


			}
		}
	}
</script>
<style lang="scss">
	.order-top {
		position: absolute;
		top: 100rpx;
		margin: 0rpx 30rpx;
		height: 440rpx;
		border-style: solid;
		border-width: 10rpx;
		border-color: blue;
		border-radius: 50rpx;
		.time{
			margin: 10rpx 10rpx;
			.put{
				margin-top: 10rpx;
			}
		}
		.tip {
			margin-left: 153rpx;
		};
		.plate_number{
			margin: 10rpx 10rpx;
			.put{
				margin-top: 10rpx;
			}
		}
	}

	;

	.order-bottom {
		position: absolute;
		top: 600rpx;
		margin-left: 30rpx;
		width: 675rpx;
		height: 460rpx;
		border-style: solid;
		border-width: 10rpx;
		border-color: blue;
		border-radius: 50rpx;
		.tip {
			margin-left: 142rpx;
		};
		.show{
			margin: 10rpx 10rpx;
			.tag{
				margin-top: 12px;
			}
		}
		
	};

	.btn-pay {
		position: absolute;
		bottom: 200rpx;
		width: 590rpx;
		margin: 20rpx 80rpx;
	}
</style>
