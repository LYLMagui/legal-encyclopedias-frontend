<template>
	<!-- 新鲜事页/话题分类 -->
	<view class="news-topic-cate">
		<!-- 标签 -->
		<u-sticky bgColor="#fff">
			<u-tabs class="wrap-card" ref="tabs" @change="changeTab" :list="tablist" :current="tabIndex"
				lineColor="#01906c" :activeStyle="{color:'#01906c'}" :inactiveStyle="{color:'#909399'}" lineWidth="30"
				:scrollable="true">
			</u-tabs>
			<!-- <view class="search-input" @click="goSearch">
				<uni-data-select v-model="searchType" :localdata="searchTypes" @change="change" :clear="false"
					class="select-data"></uni-data-select>
					
				<view class="search-input">
					<u-search 
					placeholder="请输入标题" 
					:clearabled="true" 
					v-model="searchValue"
					shape="square"
					:showAction="true"
					searchIconSize=20
					@search="searchLaw"
					@custom="searchLaw"
					></u-search>
				</view>
			</view> -->
		</u-sticky>

		<!-- 图文列表 -->
		<swiper class="wrap-card flex-1 warp-card-content" :current="swiperIndex" @animationfinish="animationfinish">
			<swiper-item class="h-full" v-for="(item, index) in swiperItem" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;background-color: #f4f3f9;"
					@scrolltolower="reachBottom">
					<!-- 有内容 -->
					<template v-if="swiperList.length > 0">
						<view v-if="item < 5">
							<library-item class=" box" :item="item1" :index="index1"
								v-for="(item1,index1) in swiperList" :key="index1"></library-item>

							<u-loadmore :status="status" :dashed="false" loadingText="努力加载中,先喝杯茶" nomoreText="下面没有啦!"
								margin-top="20rpx" margin-bottom="10rpx" :line="true" />
						</view>
						<view v-if="item === 5" style="height: 100%;width: 100%;">
							<view  class="video-container">
								<view class="video-title">中央纪委国家监委网站 开通“四风”问题监督举报曝光专区</view>
								<video id="myVideo" class="video"
									src="http://mp4.legaldaily.com.cn//source/202305/06/7c286cc7f66820757ba3d9fd141de59f/7c286cc7f66820757ba3d9fd141de59f.mp4"
									:show-center-play-btn="true"
									:enable-progress-gesture="true"
									:title="'中央纪委国家监委网站 开通“四风”问题监督举报曝光专区'"
									:auto-pause-if-navigate="true" 
									:auto-pause-if-open-native="true"
									:vslide-gesture-in-fullscreen="true"
									:controls="true"
									:show-mute-btn="true"
									play-btn-position="center"
									@play="play"
									@fullscreenchange="fullscreenchange"
									></video>
							</view>
							
						</view>
						

					</template>
					<!-- 无内容 -->
					<template v-else>
						<u-empty text="无数据" icon="/static/img/demo/spring.svg" textSize="16" marginTop='25%'
							mode="list"></u-empty>
					</template>
					<view class="scrollSpase"></view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	/**
	 * 法律书库主页
	 */
	import {
		topicList
	} from "@/utils/data/data.js"
	import LibraryItem from "@/pages/news/cpns/library-item.vue"
	import {
		queryLib
	} from "@/utils/api/libraryApi.js"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	export default {
		components: {
			TopicList,
			LibraryItem,
		},
		data() {
			return {
				// 加载更多
				status: 'loadmore',
				totalPage: 0,
				// 标签栏
				tabIndex: 0,
				tablist: [{
						name: "法案要闻",
						value: "a"
					},
					{
						name: "以案释法",
						value: "b"
					},
					{
						name: "法治动态",
						value: "c"
					},
					{
						name: "论文资料",
						value: "d"
					},
					{
						name: "普法视频",
						value: "e"
					}
				],
				searchValue: '',
				//搜索类型
				searchType: 0,
				queryParams: {
					type: 'a',
					page: 1,
					list: 10
				},
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
				swiperList: [],
				swiperItem: [1, 2, 3, 4, 5],
				//视频链接
				videoSrc:'http://mp4.legaldaily.com.cn//source/202305/06/7d159171b24e656df6134ad1fd42d1e0/7d159171b24e656df6134ad1fd42d1e0.mp4',
				videoPlay: true

				
			}
		},
		mounted() {
			this.getList(this.queryParams)
		},
		onReady(){
			this.videoContext = uni.createVideoContext("myVideo")
		},
		methods: {
			play(){
				this.videoContext.play()
				this.videoContext.requestFullScreen({ direction: 90 })
				console.log(this.videoContext);
			},
			fullscreenchange(e){
				console.log(e);
				if(!e.detail.fullScreen){
					this.videoContext.stop()
				}
			},
			// tab栏切换
			changeTab(item) {
				let params = this.queryParams
				console.log(this.queryParams);
				params.type = item.value
				this.getList(params)
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
				//滑到底部时显示状态为加载中
				this.status = 'loading';
				//请求页+1
				this.queryParams.page += 1;
				//判断是否还有数据
				if (this.queryParams.page > this.totalPage) {
					this.status = 'nomore';
					return
				}
				//延时1秒加载数据
				setTimeout(() => {
					this.getList(this.queryParams);
				}, 1000);
			},
			goSearch() {
				// this.$u.route('/pages/home/search', {
				// 	type: 'topic'
				// })
			},
			// 获取列表
			getList(params) {
				queryLib(params).then(res => {
					//设置总页数
					this.totalPage = res.data.page
					//修改加载状态
					this.status = 'loadmore'
					if (this.queryParams.page == 1) {
						this.swiperList = res.data.data
					}
					if (this.queryParams.page > 1) {
						this.swiperList = this.swiperList.concat(res.data.data)
					}
					if (this.queryParams.page >= 1 && res.data.data.length < 10 || res.data.data.length === 0) {
						this.status = 'nomore'
						return
					}
					console.log(res);
				})

				// 更新加载状态
				// this.loadStatus.splice(this.tabIndex, 1, "nomore")
			},
			//下拉框改变的方法
			change(e) {},
			//搜索栏方法
			searchLaw() {
				uni.showToast({
					title: "点击了搜索"
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.warp-card-content {
		padding: 0px 0 0 0;
	}

	.scrollSpase {
		height: 30rpx;
	}

	.news-topic-cate {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.box {
		.topic-list {
			height: 100px;
		}
	}

	.search-input {
		margin: 0px 10px;
		width: calc(100% - 20px);
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

	// 视频容器
	.video-container {
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		height: 404rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #ffffff;
		align-items: center;

		.video {
			border-radius: 10rpx;
			width: 100%;

		}

		.video-title {

			width: 97%;
			align-self: flex-start;
			line-height: 35rpx;
			margin: 0 0 10rpx 0;
			font-size: 24rpx;
		}

	}
</style>