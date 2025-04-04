<template>
	<view class="searchLayout">
		<!-- 搜索框插件 -->
		<view class="search">
			<uni-search-bar @confirm="onSearch" @cancel="onClear('cancel')" @clear="onClear('')" focus placeholder="搜索"
				v-model="queryParams.keyword">
			</uni-search-bar>
		</view>

		<!-- 标签快捷搜索 -->
		<view v-if="!classList.length || noData">
			<!-- 最近搜索 -->
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tags">
					<view class="tag" v-for="tag in historySearch" :key="tag" @click="clickTag(tag)">{{tag}}</view>
				</view>
			</view>
			<!-- 热门搜索 -->
			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>
				</view>
				<view class="tags">
					<view class="tag" v-for="tag in recommendList" :key="tag" @click="clickTag(tag)">{{tag}}</view>
				</view>
			</view>
		</view>

		<!-- 搜索无结果时展示 -->
		<view class="noData" v-if="noData">
			<uv-empty mode="search"></uv-empty>
		</view>
		<!-- 搜索结果 -->
		<view v-else>
			<view class="list">
				<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in classList"
					:key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="loading-layout" v-if="noMoreData || classList.length"><uni-load-more
					:status="noMoreData?'noMore':'loading'" /></view>
		</view>
	</view>
</template>

<script setup>
	import {
		apiSearchWall
	} from '/api/api.js'

	//查询参数
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})

	//搜索历史词
	const historySearch = ref(uni.getStorageSync('historySearch') || []);

	//热门搜索词
	const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);

	//没有更多
	const noMoreData = ref(false);
	//没有搜索结果
	const noData = ref(false);

	//搜索结果列表
	const classList = ref([]);


	//点击搜索按钮
	const onSearch = () => {
		uni.showLoading({
			title: '搜索中...'
		})
		if (queryParams.value.keyword.trim() === '') {
			uni.showToast({
				title: '关键词不能为空',
				icon: 'error'
			})
			return
		}
		// 加入搜索历史
		historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10)
		uni.setStorageSync('historySearch', historySearch.value)
		initParams(queryParams.value.keyword)
		searchData()
	}
	// 搜索请求
	const searchData = async () => {
		try {
			let res = await apiSearchWall(queryParams.value)
			classList.value = [...classList.value, ...res.data]
			uni.setStorageSync('storeWallpaperList', classList.value)
			if (res.data.length === 0 && classList.value.length === 0) noData.value = true
			if (res.data.length < queryParams.value.pageSize) noMoreData.value = true
		} finally {
			uni.hideLoading()
		}
	}

	//点击清除按钮
	const onClear = () => {
		initParams()
	}
	// 初始化/重置数据
	const initParams = (value) => {
		queryParams.value = {
			pageNum: 1,
			pageSize: 12,
			keyword: value || ''
		}
		classList.value = []
		noMoreData.value = false
		noData.value = false
	}

	//点击标签进行搜索
	const clickTag = (value) => {
		initParams(value)
		onSearch()
	}

	//点击清空搜索记录
	const removeHistory = () => {
		uni.showModal({
			title: "是否清空历史搜索？",
			success: res => {
				if (res.confirm) {
					uni.removeStorageSync('historySearch')
					historySearch.value = []
				}
			}
		})
	}

	//触底加载更多
	onReachBottom(() => {
		if (noMoreData.value) return
		queryParams.value.pageNum++
		searchData()
	})

	//关闭有页面
	onUnload(() => {
		uni.removeStorageSync('storeWallpaperList')
	})
</script>

<style lang="scss" scoped>
	.searchLayout {
		.search {
			padding: 0 10rpx;
		}

		.topTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #999;
		}

		.history {
			padding: 30rpx;
		}

		.recommend {
			padding: 30rpx;
		}

		.tags {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 20rpx;

			.tag {
				background: #F4F4F4;
				font-size: 28rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}

		.list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 20rpx 5rpx;

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