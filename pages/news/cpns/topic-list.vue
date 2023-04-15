<template>
	<!-- 法律分类列表 -->
	<view class="topic-list flex" @click="goTopicDetail(item)">
		<!-- <image :src="item.img" lazy-load mode="heightFix"></image> -->
		<view class=" flex-1">
			<view class="text-black text-32"><text>1.</text>
				中国人民共和国国立宪法(2023修正)
				<view class="tag">
					<u-tag text="现行有效" size="mini" :bgColor="tagBgColor"></u-tag>
				</view>
			</view>
			<view class="text-gray-400 text-32 my-10">现行有效 / 中华人民共和国主席令第3号 / 2023.03.13发布 / 2023.03.15施行</view>
			<!-- <view class="text-gray-400 text-24 my-10 flex w-full">
				<view class="w-1-2 text-left">热度：{{item.totalNum}}</view>
				<view class="w-1-2 text-left">今日：{{item.todayNum}}</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	/*
	 * newsTopicList 新鲜事页话题列表
	 * @description 用于新鲜事页中话题栏下面的话题列表
	 * @author MrThinco
	 * @property {Object} item 信息
	 */
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				//是否生效的标签颜色
				tagBgColor:"#33b45a"
			}
		},
		methods: {
			// 话题详情
			goTopicDetail(item) {
				// this.$u.route({
				// 	url: '/pages/news/news-topic-detail',
				// 	params: item
				// })
				this.$u.route({
					url:'/pages/home/read'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		width: 60px;
		display: inline-block;
		margin-left: 10px;
	}
	.topic-list {
		padding: 10px 20px;
		background-color: #ffffff;

		image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
</style>