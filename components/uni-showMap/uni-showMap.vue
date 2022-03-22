<template>
	<view class="item">
		<view class="item-left">
			<slot></slot>
		</view>
		<view class="item-right">
			<u--text :text="name" class="name" type="primary"></u--text>
			<u--text :text="'位置描述：'+placeDescribe" type="info"></u--text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"uni-showMap",
		data() {
			return {
				
			};
		},
		props: ['name','placeDescribe'],
	}
</script>

<style lang="scss">
	.item {
	    display: flex;
	    padding: 10px 5px;
	    border-bottom: 1px solid #f0f0f0;
		
	    // .item-right{
	    // 	position: relative;
	    // 	margin-left: 200rpx;
	    // }
	
	    .item-right {
	      display: flex;
	      flex-direction: column;
	      justify-content: space-between;
	
	      .name {
	        font-size: 13px;
	      }
			
	    }
	}
		
</style>
