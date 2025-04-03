<template>
	<view class="user-layout page-bg" v-if="userInfo">
		<view :style="{ height: getNavBarHeight()+'px' }"></view>
		<view class="user-info">
			<view class="avator">
				<image src="/static/images/logo.png" mode="aspectFill"></image>
			</view>
			<view class="nickname">
				落日繁星
			</view>
			<view class="address">
				来自于：{{ userInfo?.address?.city ||userInfo?.address?.province || userInfo?.address?.country }}
			</view>
		</view>
		<view class="section">
			<view class="list">
				<menu-item v-for="(item,index) in menu1" :key="item.name" v-bind="item"></menu-item>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<menu-item v-for="(item,index) in menu2" :key="item.name" v-bind="item"></menu-item>
			</view>
		</view>
	</view>
	<view class="loading-layout" v-else>
		<view :style="{ height: getNavBarHeight()+'px' }"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {
		getNavBarHeight
	} from '/utils/system.js'
	import {
		apiUserInfo
	} from '../../api/api.js'

	const menu1 = ref([{
		icon: 'download-filled',
		name: '我的下载',
		count: 0,
		url: '/pages/classifyList/classifyList?name=我的下载&type=download',
	}, {
		icon: 'star-filled',
		name: '我的评分',
		url: '/pages/classifyList/classifyList?name=我的评分&type=score',
		count: 0
	}, {
		icon: 'chatboxes-filled',
		name: '联系客服',
		type: 'contact'
	}, ])
	const menu2 = ref([{
		icon: 'notification-filled',
		name: '订阅更新',
		url: '/pages/notice/detail?id=653507c6466d417a3718e94b&name=订阅更新',
	}, {
		icon: 'flag-filled',
		name: '常见问题',
		url: '/pages/notice/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题',
	}, ])

	const userInfo = ref(null)
	const getUserInfo = () => {
		apiUserInfo().then(res => {
			userInfo.value = res.data
			menu1.value[0].count = userInfo.value?.downloadSize
			menu1.value[1].count = userInfo.value?.scoreSize
		})
	}
	getUserInfo()
</script>

<style lang="scss" scoped>
	.user-layout {
		.user-info {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avator {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.nickname {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: #ababab;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1rpx solid #eee;
			border-bottom: none;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
		}
	}
</style>