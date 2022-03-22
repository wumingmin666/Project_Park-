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
		<view class="btn_register">
			<u-button  type="primary" shape="circle" text="注册" size="large" @click="register()"></u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				model1: {
					userInfo: {
					name: '',
					password:''
					}
				}
			};
		},
		methods:{
			register(){
				let _this=this;
				uni.request({
					url:"http://39.105.152.242:8081/user/register",
					data:{
						"username":_this.model1.userInfo.name,
						"password":_this.model1.userInfo.password
					},
					method:"GET",
					success(res) {
						if(res.data.state==200){
							uni.showToast({
								title:"注册成功"
							});
							uni.redirectTo({
								url:"../login/login"
							})
						}else{
							uni.showToast({
								title:"该用户名可能已被注册",
								icon:"none"
							})
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.title{
		position: relative;
		top:150rpx;
		left: 280rpx;
	}
	.logo{
		margin: 10rpx 30%;
		position: relative;
		top:50rpx;
	}
	.form{
		position: relative;
		top:250rpx;
	}
	.btn_register{
		position: relative;
		top:400rpx;
		margin: 50rpx 80rpx;
	}
</style>
