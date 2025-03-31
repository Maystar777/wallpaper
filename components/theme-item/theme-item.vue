<template>
	<view class="theme-item">
		<navigator url="/pages/classifyList/classifyList" class="box" v-if="!isMore">
			<image class="pic" src="/common/images/classify2.jpg" aspectFill></image>
			<view class="tab">
				三天前更新
			</view>
			<view class="mask">
				明星美女
			</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="switchTab"  class="box more" v-else>
			<image class="pic" src="/common/images/more.jpg" aspectFill></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	defineProps({
		isMore: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped>
	.theme-item {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.tab {
				position: absolute;
				top: 0;
				left: 0;
				background: rgba(250, 120, 90, 0.7);
				backdrop-filter: blur(20rpx);
				font-size: 20rpx;
				padding: 6rpx 10rpx;
				color: #fff;
				border-radius: 10rpx 0rpx;
				transform: scale(0.8);
				transform-origin: left top;

				&::before {
					content: "●";
				}
			}

			.mask {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				font-weight: 600;
				color: #fff;
				background: rgba(0, 0, 0, 0.2);
				backdrop-filter: blur(20rpx); //模糊滤镜
			}

		}

		.box.more {
			.mask {
				height: 100%;
				width: 100%;
				flex-direction: column;

				.text {
					font-size: 28rpx;
				}
			}
		}
	}
</style>