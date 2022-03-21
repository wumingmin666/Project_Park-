<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#829074"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getInfo()">一键登录</button>
	</view>
</template>

<script>
	export default {
		name:"uni-loginwx",
		data(){
			return {
			}
		},
		methods:{
			getInfo(){
				let _this=this;
				//获取用户信息
				uni.getUserProfile({
					desc:'登录',
					success(Res) {
						//存储数据
						
					}
				});
				//登录
				uni.login({
					onlyAuthorize:true,
					success(loginRes) {
						uni.request({
							url:'http://wmmdeboke.top:8081/user/wxlogin',
							data:{
								code:loginRes.code,
							},
							method:"GET",
							success(res) {
								if(res.data.state==200){
									//存储token
									let token=res.data.data.access_token;
									_this.$store.state.token=token;
								
									//跳转页面
									uni.switchTab({
										url:"../../pages/home/home",
										success() {
											console.log("调用成功")
										}
									})
								}else{
									uni.showToast({
										title:"出错了！！"
									})
								}
								
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
	  // 登录盒子的样式
	  height: 750rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  background-color: #f8f8f8;
	  position: relative;
	  overflow: hidden;
	
	  // 绘制登录盒子底部的半椭圆造型
	  &::after {
	    content: ' ';
	    display: block;
	    position: absolute;
	    width: 100%;
	    height: 40px;
	    left: 0;
	    bottom: 0;
	    background-color: white;
	    border-radius: 100%;
	    transform: translateY(50%);
	  }
	
	  // 登录按钮的样式
	  .btn-login {
	    width: 90%;
	    border-radius: 100px;
	    margin: 15px 0;
	    background-color: #55ff00;
	  }
	
	  // 按钮下方提示消息的样式
	  .tips-text {
	    font-size: 12px;
	    color: gray;
	  }
	}
</style>
