<template>
	<!-- 新鲜事页/话题分类 -->
	<view class="news-topic-cate">
		<!-- 标签 -->
		<u-sticky bgColor="#fff">
			<u-tabs class="wrap-card" ref="tabs" @change="changeTab" :list="tablist" :current="tabIndex"
				lineColor="#01906c" :activeStyle="{color:'#01906c'}" :inactiveStyle="{color:'#909399'}" lineWidth="30"
				:scrollable="true">
			</u-tabs>
			<view class="search-input" @click="goSearch">
				<uni-data-select v-model="searchType" :localdata="searchTypes" @change="change" :clear="false"
					class="select-data"></uni-data-select>
					
				<view class="search-input">
					<u-search 
					:placeholder="searchType === 0 ? '请输入标题' : '请输入内容'" 
					:clearabled="true" 
					v-model="searchValue"
					shape="square"
					:showAction="true"
					searchIconSize=20
					@search="searchLaw"
					@custom="searchLaw"
					></u-search>
				</view>
			</view>
		</u-sticky>

		<!-- 图文列表 -->
		<swiper class="wrap-card flex-1 warp-card-content" :current="swiperIndex" @animationfinish="animationfinish">
			<swiper-item class="h-full" v-for="(item, index) in swiperList" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;background-color: #f8f8f8;"
					@scrolltolower="reachBottom">

					
					<!-- 有内容 -->
					<template v-if="item.list.length > 0">
						<topic-list class="px-20 box" :item="item1" v-for="(item1,index1) in item.list"
							:key="index1"></topic-list>
						<u-loadmore :status="loadStatus[tabIndex]"></u-loadmore>
					</template>
					<!-- 无内容 -->
					<template v-else>
						<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/spring.svg" textSize="16" marginTop='25%'
							mode="list"></u-empty>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		topicList
	} from "@/utils/data/data.js"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	export default {
		components: {
			TopicList
		},
		data() {
			return {
				// 加载更多
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
				// 标签栏
				tabIndex: 0,
				tablist: [{
						name: "中央法规"
					},
					{
						name: "地方法规"
					},
					{
						name: "立法资料"
					},
					{
						name: "立法计划"
					},
					{
						name: "中外条约"
					}
				],
				searchValue:'',
				//搜索类型
				searchType: 0,
				searchTypes: [{
						value: 0,
						text: '标题'
					},
					{
						value: 1,
						text: '内容'
					}
				],
				// 列表数据
				swiperIndex: 0,
				swiperList: topicList,
			}
		},
		methods: {
			// tab栏切换
			changeTab(item) {
				this.tabIndex = item.index
				this.swiperIndex = item.index
			},
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				this.tabIndex = e.detail.current
				this.swiperIndex = e.detail.current
			},
			// scroll-view到底部加载更多
			reachBottom() {
				// 是否可加载
				if (this.loadStatus[this.tabIndex] !== 'loadmore') return;
				// 加载更多
				this.loadStatus.splice(this.tabIndex, 1, "loading");
				setTimeout(() => {
					this.getList(this.tabIndex);
				}, 1000);
			},
			goSearch() {
				// this.$u.route('/pages/home/search', {
				// 	type: 'topic'
				// })
			},
			// 获取列表
			getList(idx) {
				// 随机添加5条数据
				for (let i = 0; i < 5; i++) {
					let index = this.$u.random(0, this.swiperList[idx].list.length - 1);
					let data = JSON.parse(JSON.stringify(this.swiperList[idx].list[index]));
					this.swiperList[idx].list.push(data);
				}
				// 更新加载状态
				this.loadStatus.splice(this.tabIndex, 1, "nomore")
			},
			//下拉框改变的方法
			change(e) {
				console.log("e:", e);
			},
			//搜索栏方法
			searchLaw(){
				uni.showToast({
					title:"点击了搜索"
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.warp-card-content {
		padding: 10px 0;
	}

	.news-topic-cate {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.box{
		.topic-list{
			height: 100px;
		}
	}

	.search-input {
		width: 100%;
		margin-top: 2rpx;
		// margin-bottom: 20rpx;
		height: 50px;
		background-color: #ffffff;
		// border-radius: 10rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-items: center;


	}

	.select-data {
		width: 60px;
		height: 66rpx;
		display: inline-block;
	}
</style>