<template>
	<view class="classify-list-layout">
		<view class="loading-layout" v-if="!wallpaperList?.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in wallpaperList"
				:key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loading-layout" v-if="wallpaperList?.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
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
	const wallpaperList = ref([])
	const noData = ref(false)
	const queryParam = {
		pageNum: 1,
		pageSize: 12
	}
	let pageName = '分类列表'
	onLoad(
		e => {

			if (e.type) queryParam.type = e.type
			else if (e.id) queryParam.classid = e.id
			else {
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
	onReachBottom(() => {
		if (noData.value) return
		queryParam.pageNum++
		getWallList()
	})
	const getWallList = async () => {
		let func = queryParam.type ? apiUserWallList : apiGetWallList
		let res = await func(queryParam)
		if (res.data?.length < queryParam.pageSize) {
			noData.value = true
		}
		wallpaperList.value = [...wallpaperList.value, ...res.data]
		uni.setStorageSync('storeWallpaperList', wallpaperList.value)
	}

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