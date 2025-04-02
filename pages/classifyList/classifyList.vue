<template>
	<view class="classify-list-layout">
		<view class="content">
			<navigator url="" class="item" v-for="item in wallpaperList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>
	import {
		apiGetWallList
	} from '../../api/api.js'
	const wallpaperList = ref([])
	const noData = ref(false)
	const queryParam = {
		pageNum: 1,
		pageSize: 12
	}
	onLoad(
		e => {
			queryParam.classid = e.id
			getWallList()
			uni.setNavigationBarTitle({
				title: e.name
			})
		}
	)
	onReachBottom(() => {
		if (noData.value) return
		queryParam.pageNum++
		getWallList()
	})
	const getWallList = async () => {
		let res = await apiGetWallList(queryParam)
		if (res.data?.length < queryParam.pageSize) {
			noData.value = true
		}
		wallpaperList.value = [...wallpaperList.value, ...res.data]
	}
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