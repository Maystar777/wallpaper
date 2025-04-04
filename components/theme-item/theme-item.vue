<template>
	<!-- 分类专题的封面 -->
	<view class="theme-item">
		<!-- 普通封面 -->
		<navigator :url="`/pages/classifyList/classifyList?id=${item._id}&name=${item.name}`" class="box"
			v-if="!isMore">
			<image class="pic" :src="item.picurl" aspectFill></image>
			<view class="tab" v-if="formatTimeAgo(item.updateTime)">
				{{ formatTimeAgo(item.updateTime) }}前更新
			</view>
			<view class="mask">
				{{ item.name }}
			</view>
		</navigator>
		<!-- 特殊封面，全模糊，用于显示“更多” -->
		<navigator url="/pages/classify/classify" open-type="switchTab" class="box more" v-else>
			<image class="pic" src="/common/images/more.jpg" aspectFill></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import {
		formatTimeAgo
	} from '../../utils/common.js'
	defineProps({
		item: {
			type: Object,
			default: () => {
				return {
					_id: '',
					name: '',
					picurl: '',
					updateTime: ''
				}
			}
		},
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