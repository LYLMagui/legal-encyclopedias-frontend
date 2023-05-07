<template>
	<view class="hot-nav">
		<view class="flex justify-between column-one">
			<view class="">法律书库</view>
			<view class="flex justify-between items-center" @click="goTopicNav()">
				更多<view class="iconfont iconqianjin"></view>
			</view>
		</view>
		<view class="flex column-two">
			<view v-for="(item,index) in list" :key="index" >{{item}}</view>
		</view>
	</view>
</template>

<script>
/**
 * 主页法律案件栏
 */
	export default {
		props:{
			// list:Array
		},
		data() {
			return {
				list: ["法案要闻","以案释法","法制动态","论文资料","法律书摘"]
			};
		},
		methods: {
			// 话题分类
			goTopicNav() {
				this.$u.route('/pages/news/news-topic-cate');
			}
		}
	}
</script>

<style lang="scss" scoped>
.hot-nav {
	border-top: 1rpx solid #EEEEEE;
	border-bottom: 1rpx solid #EEEEEE;
	padding: 20rpx;
	.column-one {
		margin-bottom: 20rpx;
		& > view:last-child {
			color: #9b9b9b;
		}
		& > view:first-child {
			font-size: 32rpx;
		}
	}
	.column-two > view {
		text-align: center;
		flex: 1;
		background: #f2f2f2;
		color: #9b9b9b;
		border-radius: 10rpx;
		margin: 0 10rpx;
	}
}
</style>
