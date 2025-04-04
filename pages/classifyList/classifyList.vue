<template>
	<!-- 某分类详情列表页 -->
	<view class="classify-list-layout">
		<!-- 顶部loading，用于初始化 -->
		<view class="loading-layout" v-if="!wallpaperList?.length && !noMore">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in wallpaperList"
				:key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<!-- 底部loading，用于触底加载新内容 -->
		<view class="loading-layout" v-if="wallpaperList?.length || noMore">
			<uni-load-more :status="noMore?'noMore':'loading'"></uni-load-more>
		</view>
		<!-- 安全区域，根据环境变量设置高度 -->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
	import {
		goHome
	} from '../../utils/common.js'
	import {
		apiGetWallList,
		apiUserWallList
	} from '../../api/api.js'

	const wallpaperList = ref([]) //壁纸数据列表
	const noMore = ref(false) //是否还有更多数据
	const queryParam = {
		pageNum: 1,
		pageSize: 12
	}
	let pageName = '分类列表'

	// 根据query传参初始化数据
	onLoad(
		e => {
			if (e.type) queryParam.type = e.type
			else if (e.id) queryParam.classid = e.id
			else { //参数有误返回主页
				goHome()
				return
			}
			getWallList()
			uni.setNavigationBarTitle({
				title: e.name
			})
			pageName = e.name
		}
	)

	// 触底拉取下一页数据
	onReachBottom(() => {
		if (noMore.value) return
		queryParam.pageNum++
		getWallList()
	})

	// 获取图片数据
	const getWallList = async () => {
		let func = queryParam.type ? apiUserWallList : apiGetWallList
		let res = await func(queryParam)
		if (res.data?.length < queryParam.pageSize) {
			noMore.value = true
		}
		wallpaperList.value = [...wallpaperList.value, ...res.data]
		// 设置缓存供preview预览页使用
		uni.setStorageSync('storeWallpaperList', wallpaperList.value)
	}
	// 卸载时清空缓存
	onUnload(() => {
		uni.removeStorageSync('storeWallpaperList')
	})

	// 分享给好友
	onShareAppMessage((res) => {
		return {
			title: `【羽绘壁纸】${pageName}`,
			path: `/pages/classifyList/classifyList?id=${queryParam.classid}&name=${pageName}`
		}
	})
	// 分享到朋友圈
	onShareTimeline((res) => {
		return {
			title: `【羽绘壁纸】${pageName}`,
			query: `id=${queryParam.classid}&name=${pageName}`
		}
	})
</script>

<style lang="scss" scoped>
	.classify-list-layout {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>