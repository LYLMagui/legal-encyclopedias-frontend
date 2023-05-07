<template>
	<!-- 法律分类列表 -->
	<view class="topic-list flex" @click="goTopicDetail(item)">
		<!-- <image :src="item.img" lazy-load mode="heightFix"></image> -->
		<view class=" flex-1">
			<view class="text-black text-32"><text>{{index + 1}}.</text>
				{{item.title}}
<!-- 				<view class="tag">
					<u-tag :text="activity" size="mini" :bgColor="tagBgColor"></u-tag>
				</view> -->
			</view>
			<view class="text-gray-400 text-30 my-10">
				<text v-if="item.origin != null">{{item.origin + "&nbsp;"}}</text>{{item.updataTime}}
				</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 法律书库页面item项
	 */
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			},
			index: {
				default: () => ({})
			}
		},
		data() {
			return {
				//是否生效的标签颜色
				tagBgColor:"#33b45a",
				activity:''
			}
		},
		onShow() {
			
		},
		mounted() {
			if(this.item.activity === 1){
				this.activity = '现行有效'
			}else if(this.item.activity === 2){
				this.activity = '部分有效'
			}else{
				this.tagBgColor = '#ffca3a'
				this.activity = '失效'
			}
		},
		methods: {
			// 法律详情
			goTopicDetail(item) {
				this.$u.route({
					url:'/pages/news/cpns/library-detail?item=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		width: auto;
		display: inline-block;
		margin-left: 10px;
	}
	.topic-list {
		
		margin: 10rpx 0;
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