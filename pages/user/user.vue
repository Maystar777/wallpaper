<template>
	<view class="user-layout">
		<view class="user-info">
			<view class="avator">
				<image src="/static/images/logo.png" mode="aspectFill"></image>
			</view>
			<view class="nickname">
				落日繁星
			</view>
			<view class="address">
				来自于：福建
			</view>
		</view>
		<view class="section">
			<view class="list">
				<menu-item v-for="item in 3"></menu-item>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<menu-item v-for="item in 2"></menu-item>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.user-layout {
		.user-info {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avator {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.nickname {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: #ababab;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1rpx solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

			.list {}
		}
	}
</style>