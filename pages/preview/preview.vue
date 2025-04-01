<template>
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="item in 10">
				<image @click="maskChange" src="/common/images/preview1.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view class="go-back" :style="{ top: getStatusBarHeight()+'px' }" @click="goBack()">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">
				3 / 9
			</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>

			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="onClickInfo">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">
						信息
					</view>
				</view>
				<view class="box">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">
						5分
					</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="infoPopup">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">
						壁纸信息
					</view>
					<view class="close" @click="onCloseInfo">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">
								壁纸ID：
							</view>
							<text user-select selectable
								class="value">1111111112111111111211111111121111111112111111111211111111121111111112</text>
						</view>
						<view class="row">
							<view class="label">
								分类：
							</view>
							<text class="value classify">帅哥美女</text>
						</view>
						<view class="row">
							<view class="label">
								发布者：
							</view>
							<text class="value">小猫爱吃鱼</text>
						</view>
						<view class="row">
							<view class="label">
								评分：
							</view>
							<uni-rate :readonly="true" :touchable="false" :value="3.5" size="16" />
						</view>
						<view class="row">
							<view class="label">
								摘要：
							</view>
							<text class="value">小猫爱吃鱼</text>
						</view>
						<view class="row">
							<view class="label">
								标签：
							</view>
							<view class="tags">
								<view class="tag">
									可爱
								</view>
								<view class="tag">
									性感
								</view>
							</view>
						</view>
						<view class="copyright">
							声明：本图片来自用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，管理员将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		getStatusBarHeight,
	} from '@/utils/system.js'
	const maskState = ref(true)
	const infoPopup = ref(null)

	function maskChange() {
		maskState.value = !maskState.value
	}

	function onClickInfo() {
		infoPopup.value.open('bottom')
	}

	function onCloseInfo() {
		infoPopup.value.close()
	}

	function goBack() {
		uni.navigateBack()
	}
</script>

<style lang="scss" scoped>
	.preview {
		height: 100vh;
		width: 100%;
		position: relative;

		swiper {
			height: 100%;
			width: 100%;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				color: #fff;
			}

			.go-back {
				width: 38px;
				height: 38px;
				border-radius: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 60rpx;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.count {
				top: 10vh;
				font-size: 28rpx;
				background: rgba(0, 0, 0, 0.3);
				padding: 8rpx 28rpx;
				border-radius: 40rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				top: calc(10vh + 80rpx);
				font-size: 140rpx;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);

			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				background: rgba(255, 255, 255, 0.8);
				width: 65vw;
				height: 120rpx;
				bottom: 10vh;
				border-radius: 120rpx;
				color: #000;
				display: flex;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
				backdrop-filter: blur(10rpx);

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			.popHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					color: $text-font-color-2;
					font-size: 26rpx;
				}

				.close {
					padding: 6rpx
				}
			}

			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						align-items: center;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}

						.value {
							flex: 1;
							width: 0; //?
						}

						.classify {
							color: $brand-theme-color;
						}

						.tags {
							display: flex;
							flex-wrap: wrap;

							.tag {
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 10rpx 30rpx;
								border-radius: 40rpx;
								line-height: 1em;
								margin-right: 10rpx;
							}
						}
					}

					.copyright {
						font-size: 28rpx;
						padding: 20rpx;
						background: #F6F6F6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}
		}
	}
</style>