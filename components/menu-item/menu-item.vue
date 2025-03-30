<template>
	<view class="menu-item">
		<view class="left">
			<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
			<view class="text">
				我的下载
			</view>
		</view>
		<view class="right">
			<view class="text">
				0
			</view>
			<uni-icons type="right" size="18" color="#aaa"></uni-icons>

		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 100rpx;
		border-bottom: 1rpx solid #eee;

		&:last-child {
			border-bottom: 0;
		}



		.left {
			display: flex;
			align-items: center;
			.text {
				padding-left: 10rpx;
				color: #666;
			}
		}

		.right {
			display: flex;
			align-items: center;
			.text {
				font-size: 28rpx;
				padding-right: 10rpx;
				color: #aaa;
			}
		}
	}
</style>