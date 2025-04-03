<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="onSwiperChange">
			<swiper-item v-for="(item,index) in wallpaperList" :key="item._id">
				<image v-if="readImg.has(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view class="go-back" :style="{ top: getStatusBarHeight()+'px' }" @click="goBack()">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">
				{{ currentIndex+1 }} / {{ wallpaperList.length }}
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
				<view class="box" @click="onClickScore">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">
						{{ currentInfo.score }}分
					</view>
				</view>
				<view class="box" @click="onClickDownLoad">
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
							<text user-select selectable class="value">{{ currentInfo._id }}</text>
						</view>
						<!-- <view class="row">
							<view class="label">
								分类：
							</view>
							<text class="value classify"></text>
						</view> -->
						<view class="row">
							<view class="label">
								发布者：
							</view>
							<text class="value">{{ currentInfo.nickname }}</text>
						</view>
						<view class="row">
							<view class="label">
								评分：
							</view>
							<view class="value score-box">
								<uni-rate :readonly="true" :touchable="false" :value="currentInfo.score" size="16" />
								<text class="score">{{currentInfo.score}}分</text>
							</view>

						</view>
						<view class="row">
							<view class="label">
								摘要：
							</view>
							<text class="value">{{ currentInfo.description }}</text>
						</view>
						<view class="row">
							<view class="label">
								标签：
							</view>
							<view class="tags">
								<view class="tag" v-for="(item, index) in currentInfo.tabs" :key="index">
									{{ item }}
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
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{ isScore? '评过分了~': '壁纸评分' }}</view>
					<view class="close" @click="onCloseScore">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" />
					<text class="text">{{userScore}}分</text>
				</view>

				<view class="footer">
					<button @click="submitScore" :disabled="!userScore || isScore" type="default" size="mini"
						plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		apiSetScore,
		apiWriteDownload
	} from '/api/api.js'
	import {
		getStatusBarHeight,
	} from '@/utils/system.js'
	const maskState = ref(true)

	const infoPopup = ref(null)
	const scorePopup = ref(null);
	const userScore = ref(0)
	const isScore = ref(false)

	const wallpaperList = ref([])
	const currentId = ref(null)
	const currentIndex = ref(0)
	const currentInfo = ref({})
	const readImg = ref(new Set())

	onLoad((e) => {
		currentId.value = e.id
		initData()
	})

	function initData() {
		const storeWallpaperList = uni.getStorageSync('storeWallpaperList') || []
		wallpaperList.value = storeWallpaperList.map(item => {
			return {
				...item,
				picurl: item.smallPicurl.replace("_small.webp", ".jpg")
			}
		})
		currentIndex.value = wallpaperList.value.findIndex(item => item._id === currentId.value)
		currentInfo.value = wallpaperList.value[currentIndex.value]
		addReadImgs()
	}

	function onSwiperChange(e) {
		currentIndex.value = e.detail.current
		currentInfo.value = wallpaperList.value[currentIndex.value]
		addReadImgs()
	}

	function addReadImgs() {
		const length = wallpaperList.value.length
		readImg.value.add(currentIndex.value)
		readImg.value.add((currentIndex.value - 1 + length) % length)
		readImg.value.add((currentIndex.value + 1) % length)
	}

	function maskChange() {
		maskState.value = !maskState.value
	}

	function onClickInfo() {
		infoPopup.value.open('bottom')
	}

	function onCloseInfo() {
		infoPopup.value.close()
	}


	//评分弹窗
	const onClickScore = () => {
		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		}
		scorePopup.value.open();
	}
	//关闭评分框
	const onCloseScore = () => {
		scorePopup.value.close()
		userScore.value = 0
		isScore.value = false
	}

	//确认评分
	const submitScore = () => {
		uni.showLoading({
			title: '加载中...'
		})
		const {
			classid,
			_id: wallId
		} = currentInfo.value
		apiSetScore({
			userScore: userScore.value,
			classid,
			wallId
		}).then(res => {
			uni.hideLoading()
			if (res.errCode === 0) {
				uni.showToast({
					title: '评分成功！',
				})
				wallpaperList.value[currentIndex.value].userScore = userScore.value
				uni.setStorageSync("storeWallpaperList", wallpaperList.value)
				onCloseScore()
			}
		})
	}

	const onClickDownLoad = async () => {
		// #ifdef H5
		uni.showModal({
			content: "请长按后保存壁纸",
			showCancel: false
		})
		// #endif
		// #ifndef H5
		try {
			uni.showLoading({
				title: '下载中',
				mask: true
			})
			// 调用接口，可以防止5秒内重复点击
			const {
				classid,
				_id: wallId
			} = currentInfo.value
			let res = await apiWriteDownload({
				classid,
				wallId
			})
			if (res.errCode !== 0) throw res
			// 保存到相册
			saveImageToAlbum()
		} catch (error) {
			uni.hideLoading()
		}
		// #endif
	}

	const saveImageToAlbum = () => {
		// 获取一个临时地址
		uni.getImageInfo({
			src: currentInfo.value.picurl,
			success: (res) => {
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: () => {
						uni.showToast({
							title: '保存成功！'
						});
					},
					fail: err => {
						// 已获得权限，但未点击确定保存
						if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
							uni.showToast({
								title: '保存失败，请重新点击下载',
								icon: 'none'
							})
							return
						}
						// 未获得权限，需弹框询问
						getAlbumAuth()
					},
					complete: () => {
						uni.hideLoading()
					}
				});
			}
		})

	}
	const getAlbumAuth = () => {
		uni.showModal({
			title: '授权提示',
			content: '需要授权保存相册',
			success: res => {
				if (res.confirm) {
					uni.openSetting({
						success: (setting) => {
							uni.showToast({
								title: setting.authSetting['scope.writePhotosAlbum'] ?
									'获取授权成功' : '获取授权失败',
								icon: 'none'
							})
						}
					})
				}
			}
		})

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

						.score-box {
							display: flex;
							align-items: center;
							gap: 20rpx;
							color: $text-font-color-2;
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
								padding: 0rpx 20rpx;
								border-radius: 40rpx;
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

		.scorePopup {
			background: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;

			.popHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.content {
				padding: 30rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					color: #FFCA3E;
					padding-left: 10rpx;
					width: 80rpx;
					line-height: 1em;
					text-align: right;
				}
			}

			.footer {
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>