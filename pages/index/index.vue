<template>
	<!-- 首页 -->
	<view class="home-layout page-bg">
		<!-- 自定义公共头部 -->
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- Banner横向轮播 -->
		<view class="banner">
			<swiper indicator-dots autoplay :interval="3000" :duration="1000" indicator-color="rgba(255,255,255,0.5)"
				indicator-active-color="#fff">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<!-- 跳转其他小程序 -->
					<navigator v-if="item.target === 'miniProgram'" target='miniProgram' :app-id="item.appid"
						class="link" :url="`/pages/classifyList/classifyList?${item.url}`">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<!-- 跳转站内页面 -->
					<navigator v-else class="link" :url="`/pages/classifyList/classifyList?${item.url}`">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告竖向轮播 -->
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay :interval="3000" :duration="1000" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="`/pages/notice/detail?id=${item._id}`">
							{{ item.title }}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20"></uni-icons>
						<uni-dateformat :date="Date.now()" format='dd日'></uni-dateformat>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="switchTab" class="more">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :is-more="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		apiGetBanner,
		apiGetDayRandom,
		apiGetNotice,
		apiGetClassify
	} from '../../api/api.js'
	const bannerList = ref([])
	const randomList = ref([])
	const noticeList = ref([])
	const classifyList = ref([])

	onLoad(() => {
		getBanner()
		getNotice()
		getDayRandom()
		getClassify()
	})
	// 获取Banner数据
	const getBanner = async () => {
		let res = await apiGetBanner()
		// #ifdef MP-WEIXIN
		bannerList.value = res.data || []
		// #endif
		// #ifndef MP-WEIXIN
		bannerList.value = (res.data || []).filter(item => item.target !== 'miniProgram')
		// #endif
	}
	// 获取公告数据
	const getNotice = async () => {
		let res = await apiGetNotice()
		noticeList.value = res.data
	}
	// 获取每日推荐数据
	const getDayRandom = async () => {
		let res = await apiGetDayRandom()
		randomList.value = res.data
	}
	// 获取精选专题（分类）
	const getClassify = async () => {
		let res = await apiGetClassify({
			select: true
		})
		classifyList.value = res.data
	}
	// 跳转到预览页
	const goPreview = (id) => {
		uni.setStorageSync('storeWallpaperList', randomList.value)
		uni.navigateTo({
			url: `/pages/preview/preview?id=${id}`
		})
	}
	// 分享给好友
	onShareAppMessage((res) => {
		return {
			title: '羽绘壁纸',
			path: '/pages/index/index'
		}
	})
	// 分享到朋友圈
	onShareTimeline((res) => {
		return {
			title: '羽绘壁纸',
			// path: '/pages/index/index'
			imageurl: bannerList.value[0]?.picurl
		}
	})
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

				.link {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
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

				//vue3写法。  vue2用的是/deep/或::v-deep
				:deep(.uni-icons) {
					color: $brand-theme-color !important
				}

				.text {
					font-weight: 600;
					font-size: 28rpx;
					color: $brand-theme-color
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
				color: $brand-theme-color;
				display: flex;
				align-items: center;

				:deep(.uni-icons) {
					color: $brand-theme-color !important
				}
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