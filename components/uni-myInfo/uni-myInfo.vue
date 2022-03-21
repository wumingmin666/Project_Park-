<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<uni-icons type="contact-filled" size="100" color="#829074"></uni-icons>
			<!-- <image src="" class="avatar"></image> -->
			<view class="nickname">xxx</view>
		</view>
		<u-cell-group >
			<u-cell title="服务" isLink url="/pages/" size="large"></u-cell>
			<u-cell title="订单" isLink url="/pages/" size="large"></u-cell>
			<u-cell title="设置" isLink url="/pages/" size="large"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: "uni-myInfo",
		data() {
			return {
				
			};
		},
		onLoad() {
			
			// uni.request({
			// 	url:"",
			// 	method:"GET"
			// 	header:{
			// 		access_token:_this.$store.state.token
			// 	},
			// 	success(res) {
			// 		//接收username,avatar等
			// 	}
			// })
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		// 为整个组件的结构添加浅灰色的背景
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.avatar {
				display: block;
				width: 90px;
				height: 90px;
				border-radius: 45px;
				border: 2px solid white;
				box-shadow: 0 1px 5px black;
			}

			.nickname {
				color: white;
				font-weight: bold;
				font-size: 16px;
				margin-top: 10px;
			}
		}
	}
	.cell{
		height: 150rpx;
		margin-top: 200rpx;
	}
</style>
