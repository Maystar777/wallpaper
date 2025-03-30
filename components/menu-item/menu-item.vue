<template>
	<view class="menu-item">
		<view class="left">
			<uni-icons :type="icon" size="20" color="#28b389"></uni-icons>
			<view class="text">
				{{ name }}
			</view>
		</view>
		<view class="right">
			<view class="text">
				{{ count }}
			</view>
			<uni-icons type="right" size="18" color="#aaa"></uni-icons>
		</view>
		<!-- #ifdef MP -->
		<button v-if="type==='contact'" class="contact" open-type="contact">联系客服</button>
		<!--  #endif -->
		<!-- #ifndef MP -->
		<button v-if="type==='contact'" class="contact" @click="onContact">拨打电话</button>
		<!-- #endif -->
	</view>
</template>

<script setup>
	defineProps({
		icon: {
			type: String,
		},
		name: {
			type: String,
		},
		count: {
			type: Number,
		},
		type: {
			type: String,
			default: ''
		}
	})

	function onContact() {
		uni.makePhoneCall({
			phoneNumber: '114'
		})
	}
</script>

<style lang="scss" scoped>
	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		position: relative;

		.left {
			display: flex;
			align-items: center;

			.text {
				padding-left: 10rpx;
				color: #666;
			}
		}

		.right {
			display: flex;
			align-items: center;

			.text {
				font-size: 28rpx;
				padding-right: 10rpx;
				color: #aaa;
			}
		}

		.contact {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			opacity: 0;
		}
	}
</style>