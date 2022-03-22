<template>
	<view>
		<view class="logo">
			<u--image src="../../static/logo.png" shape="circle" width="300rpx" height="300rpx"></u--image>
		</view>
		<view class="title"><u--text type="primary" text="智慧停" size="30"></u--text></view>
		<u--form class="form" :model="model1" ref="form1">
			<u-form-item label="用户名" labelWidth="60" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.name" border="surround" placeholder="请输入用户名"></u--input>
			</u-form-item>
			<u-form-item label="密码" labelWidth="60" borderBottom ref="item2">
				<u--input v-model="model1.userInfo.password" border="surround" placeholder="请输入密码" type="password"></u--input>
			</u-form-item>
		</u--form>
		<view class="btn_login">
			<u-button type="primary" shape="circle" text="点击登录" size="large" @click="login()"></u-button>
		</view>
		<view class="register">
			<u--text text="没有账号?"></u--text>
			<navigator url="/pages/register/register" open-type="navigate">立即注册</navigator>
		</view>		
	</view>	
</template>
<script>
	export default {
		name:"uni-loginapp",
		data() {
			return {
				model1: {
					userInfo: {
					name: '',
					password:''
					}
				},
				longitude:"",
				latitude:""
			}
		},
		methods:{
			
			login() {
				let _this=this;
				//获取地理位置
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log("执行")
						//存储位置信息
						_this.longitude=res.longitude;
						_this.latitude=res.latitude;
						_this.$store.state.longitude=_this.longitude;
						_this.$store.state.latitude=_this.latitude
					},fail() {
						console.log("获取位置失败")
					}
				});
				if(_this.model1.userInfo.name=="" || _this.model1.userInfo.password==""){
					uni.showToast({
						title:"请正确输入用户名与密码"
					})
				}else{
						console.log(_this.model1.userInfo.name);
						console.log(_this.model1.userInfo.password)
						uni.request({
							url:"http://39.105.152.242:8081/user/login",
							method:"Get",
							data:{
								"username":_this.model1.userInfo.name,
								"password":_this.model1.userInfo.password,
								"longitude":_this.longitude,
								"latitude":_this.latitude
							},
							success(res){
								console.log(res)
								if(res.data.state==200){
									let token=res.data.data.access_token;
									_this.$store.state.token=token;
									uni.showToast({
										title:"登录成功"
									})
									//跳转页面
									uni.switchTab({
										url:"../../pages/home/home",
										success() {
											console.log("调用成功")
										}
									})
								}else{
									uni.showToast({
										title:"密码或用户名错误！",
										icon:"none"
									})
								}
								
							},fail() {
								uni.showToast({
									title:"失败"
								})
							}
						})
					}
					
					
			}
		}
	}
</script>
<style>
	.title{
		position: relative;
		top:70rpx;
		left: 280rpx;
	}
	.logo{
		margin: 10rpx 30%;
		position: relative;
		top:50rpx;
	}
	.form{
		position: relative;
		top:100rpx;
	}
	.btn_login{
		position: relative;
		top:200rpx;
		margin: 50rpx 80rpx;
	}
	.register{
		position: relative;
		bottom: 80rpx;
		margin-left: 550rpx;
	}
	navigator{
		font-size: 40rpx;
		color: #007AFF;
	}
</style>
