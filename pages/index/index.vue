<template>
	<view class="home-layout">
		<view class="banner">
			<swiper indicator-dots autoplay :interval="3000" :duration="1000" indicator-color="rgba(255,255,255,0.5)"
				indicator-active-color="#fff">
				<swiper-item v-for="item in 3">
					<image :src="`/common/images/banner${item}.jpg`" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay :interval="3000" :duration="1000" circular>
					<swiper-item v-for="item in 4">
						文字效果文字效果文字效果文字效果文字效果
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.home-layout {
		.banner {
			width: 750rpx;

			swiper {
				width: 700rpx;
				height: 340rpx;
				padding: 20rpx 25rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}

		.notice {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin: 20rpx 30rpx;
			background: #f9f9f9;
			border-radius: 80rpx;
			display: flex;

			.left {
				width: 140rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					font-weight: 600;
					font-size: 28rpx;
					color: #28b389
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}

			.right {
				width: 70rpx
			}
		}
	}
</style>