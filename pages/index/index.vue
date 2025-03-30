<template>
	<view class="home-layout">
		<view class="banner">
			<swiper indicator-dots autoplay :interval="3000" :duration="1000" indicator-color="rgba(255,255,255,0.5)"
				indicator-active-color="#fff">
				<swiper-item v-for="item in 3">
					<image :src="`/common/images/banner${item}.jpg`" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.home-layout {
		.banner {
			width: 750rpx;

			swiper {
				width: 700rpx;
				height: 340rpx;
				padding: 20rpx 25rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}
		}
	}
</style>