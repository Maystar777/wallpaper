<template>
	<view class="custom-nav-bar">
		<view class="nav-bar">
			<view class="status-bar" :style="{ height: getStatusBarHeight()-5+'px' }"></view>
			<view class="title-bar" :style="{ height: getTitleBarHeight()+5+'px', marginLeft: getleftIcon()+'px' }">
				<view class="title">
					{{ title }}
				</view>
				<navigator class="search" url="/pages/search/search">
					<uni-icons type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{height: getNavBarHeight()+'px' }"></view>
	</view>
</template>

<script setup>
	import {
		getStatusBarHeight,
		getTitleBarHeight,
		getNavBarHeight,
		getleftIcon
	} from '@/utils/system.js'
	defineProps({
		title: {
			type: String,
			default: '壁纸'
		}
	})
</script>

<style lang="scss" scoped>
	.custom-nav-bar {
		.nav-bar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			background:
				linear-gradient(to bottom, transparent, #fff 400rpx),
				linear-gradient(to right, #a8e6cf, #dcedc1);

			.title-bar {
				display: flex;
				align-items: center;
				gap: 30rpx;
				padding-left: 20rpx;
				margin-bottom: 5rpx;

				.title {
					font-size: 50rpx;
					font-weight: 600;
					color: $text-font-color-1;
					line-height: 1em;
				}

				.search {
					padding: 8rpx 100rpx 8rpx 10rpx;
					background: rgba(255, 255, 255, 0.7);
					backdrop-filter: blur(20rpx);
					border-radius: 1em;
					border: 1rpx solid #fff;

					.text {
						margin-left: 5rpx;
						color: $text-font-color-3;
					}
				}
			}

		}
	}
</style>