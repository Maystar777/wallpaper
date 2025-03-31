<template>
	<view class="home-layout page-bg">
		<view class="banner">
			<swiper indicator-dots autoplay :interval="3000" :duration="1000" indicator-color="rgba(255,255,255,0.5)"
				indicator-active-color="#fff">
				<swiper-item v-for="item in 3">
					<image src="/common/images/banner1.jpg" mode="aspectFill"></image>
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
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20" color="#28b389"></uni-icons>
						<uni-dateformat :date="Date.now()" format='dd日'></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in 8">
						<image src="/common/images/preview_small.webp" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<navigator url="/pages/classify/classify" class="more">More+</navigator>
				</template>
			</common-title>

			<view class="content">
				<theme-item v-for="item in 8"></theme-item>
				<theme-item :is-more="true"></theme-item>

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
			padding-top: 25rpx;
			swiper {
				width: 700rpx;
				height: 340rpx;
				margin: 0 auto;

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

		.select {
			padding-top: 20rpx;

			.date {
				color: #28b389;
				display: flex;
				align-items: center;
			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

					.box:last-child {
						margin-right: 30rpx;
					}
				}
			}
		}

		.theme {
			padding: 50rpx 0;

			.more {
				font-size: 32rpx;
				color: #888
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				gap: 15rpx;
				// 网格布局
				display: grid;
				grid-template-columns: repeat(3, 1fr);

			}
		}
	}
</style>