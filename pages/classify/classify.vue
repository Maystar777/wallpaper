<template>
	<!-- 分类总览页面 -->
	<view class="classify-layout page-bg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
	import {
		apiGetClassify
	} from '../../api/api.js'
	
	const classifyList = ref([])

	// 获取类别数据
	const getClassify = async () => {
		let res = await apiGetClassify({
			pageSize: 15
		})
		classifyList.value = res.data
	}

	onLoad(() => {
		getClassify()
	})

	// 分享给好友
	onShareAppMessage((res) => {
		return {
			title: '【羽绘壁纸】精选分类',
			path: '/pages/classify/classify'
		}
	})
	// 分享到朋友圈
	onShareTimeline((res) => {
		return {
			title: '【羽绘壁纸】精选分类',
		}
	})
</script>

<style lang="scss" scoped>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;

	}
</style>