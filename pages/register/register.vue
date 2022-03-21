<template>
	<view>
		<u--form labelPosition="" :model="model1" ref="form1">
			<u-form-item label="用户名" labelWidth="60" borderBottom ref="item1">
				<u--input v-model="model1.userInfo.name" border="none" placeholder="请输入用户名"></u--input>
			</u-form-item>
			<u-form-item label="密码" labelWidth="60" borderBottom ref="item2">
				<u--input v-model="model1.userInfo.password" border="none" placeholder="请输入密码" type="password"></u--input>
			</u-form-item>
		</u--form>			
		<u-button type="primary" shape="circle" text="注册" size="large" @click="register()"></u-button>
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
								title:"注册失败"
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
