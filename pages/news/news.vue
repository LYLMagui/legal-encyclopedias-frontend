<template>
	<!-- 新鲜事页 -->
	<view class="news">
		<!-- 导航栏 -->
		<u-navbar placeholder>
			<view slot="left"></view>
			<view slot="center" class="nav-center">
				<view :class="{'active':tabIndex === index}" @click="changeTab(index)" v-for="(item,index) in tabList"
					:key="index">
					<view class="nav-title">{{item.name}}</view>
					<view class="active-line"></view>
				</view>
			</view>
		</u-navbar>
		<!-- 信息列表 -->
		<swiper class="bg-white" :style="{height:swiperHeight - 20 + 'px'}" :current="tabIndex" @change="changeSwiper">
			<!-- 分类查询 -->
			<swiper-item class="swiper" style="height: calc(100% - 44px);">
				<view class="search-bar">
					<u--form labelPosition="left" :model="model1" ref="uForm">
						<u-form-item>
							<u-checkbox-group v-model="checkboxValue1" placement="row" @change="lawLabSelect">
								<u-checkbox shape="circle" size="14" v-for="(item, index) in checkboxList1" :key="index"
									:label="item.name" :name="item.value">
								</u-checkbox>
							</u-checkbox-group>
						</u-form-item>
					</u--form>
				</view>
				<view class="search-center">
					<view class="search-center-left">
						<view class="law-type" :class="{'title-color':index === selectedItemIndex }"
							v-for="(item,index) in lawTypes" @click="currCell(item.topCategory,index)">{{item.topName}}
						</view>
					</view>
					<scroll-view :scroll-y="true" class="search-center-right">
						<view class="search-center-right-list">
							<view class="law-kinds" v-for="(item,index) in lawKind" @click="openSearchList(item.secondCategory)">
								{{item.secondName}}
							</view>
						</view>
					</scroll-view>
				</view>




				<!-- <scroll-view scroll-y class="flow h-full" @scrolltolower="reachBottom">
					<info-list v-for="(item,index) in followList.list" :key="index" :item="item">
					</info-list>
					<u-loadmore :status="followList.loadStatus"></u-loadmore>
				</scroll-view> -->
			</swiper-item>
			<!-- 法规主页 -->
			<swiper-item>
				<scroll-view scroll-y class="topic h-full">
					<!-- 搜索框 -->
					<view class="search-input" @click="goSearch">
						<u-input type="text" placeholder="请输入搜索内容" placeholderClass="iconfont iconsousuo text-28"
							border="none" inputAlign="center" clearable confirmType="search" disabled>
						</u-input>
					</view>
					<!-- 轮播图 -->
					<u-swiper :list="topicList.swiper" keyName="image" indicator indicatorMode="line" circular showTitle
						height="400rpx" previousMargin="30" nextMargin="30" bgColor="#ffffff"></u-swiper>
					<!-- 热门分类 -->
					<news-topic-nav :list="topicList.topic"></news-topic-nav>
					<!-- 最近更新 -->
					<view class="last-update">
						<view class="last-update-name">最新法规</view>
						<topic-list :item="item" v-for="(item,index) in topicList.list" :key="index"></topic-list>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		chatList,
		newsList,
		topicList
	} from "@/utils/data/data.js"
	import InfoList from "@/pages/home/cpns/info-list.vue"
	import NewsTopicNav from "@/pages/news/cpns/news-topic-nav.vue"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	import {
		queryLawType,
		querySecType
	} from "@/utils/api/legalApi.js"
	export default {
		components: {
			InfoList,
			NewsTopicNav,
			TopicList,
		},
		data() {
			return {
				lawTypes: ['国家法', '行政法', '刑法', '民商法', '经济法', '知识产权', '诉讼仲裁', '司法制度'],
				model1: {},
				checkboxValue1: [1],
				checkboxList1: [{
						name: '国家法律法规库',
						disabled: false,
						value: 1
					},
					{
						name: '地方法律法规库',
						disabled: false,
						value: 2
					},
				],

				// 导航标签
				tabIndex: 1,
				tabList: [{
						name: "分类查询",
						id: 'follow'
					},
					{
						name: "法规主页",
						id: 'topic'
					}
				],
				swiperHeight: 0,
				// 关注列表
				followList: {
					// 加载更多
					loadStatus: 'loadmore',
					// 列表数据
					list: newsList[0].list
				},
				// 话题列表
				topicList: {
					swiper: [ // 轮播图
						{
							image: '/static/img/demo/spring.svg',
							title: '迷人的春天是令人欢欣鼓舞的。'
						},
						{
							image: '/static/img/demo/summer.svg',
							title: '一道残阳铺水中，半江瑟瑟半江红。'
						},
						{
							image: '/static/img/demo/autumn.svg',
							title: '金秋的阳光温馨恬静，金秋的微风和煦轻柔。'
						},
						{
							image: '/static/img/demo/winter.svg',
							title: '风吹过，寒气直侵入骨头。'
						}
					],
					topic: [ // 话题
						{
							title: '最新',
							id: 1
						},
						{
							title: '游戏',
							id: 2
						},
						{
							title: '健身',
							id: 3
						},
						{
							title: '情感',
							id: 4
						},
						{
							title: '故事',
							id: 5
						},
						{
							title: '旅游',
							id: 6
						}
					],
					list: topicList[1].list,
				},
				selectedItemIndex: -1,
				lawKinds: [],
				lawKind: [],
				show: false
			}
		},
		onLoad() {
			// 设置swiperHeight
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// 可使用窗口高度 = swiper高度 + 自定义导航栏高度
					this.swiperHeight = res.windowHeight - 44
				}
			})
		},
		created() {
			//获取一级分类列表
			this.queryLawType()
			this.selectedItemIndex = 0

		},
		mounted() {
			this.currCell("NF", 0)
		},
		methods: {
			//点击左侧菜单切换中间的分类
			currCell(data, index) {
				querySecType(data).then(res => {
					this.lawKind = res.data
					console.log(res);
				})
				this.selectedItemIndex = index;
				this.selected = !this.selected;
			},
			lawLabSelect() {
				console.log(this.checkboxValue1);
			},
			// tabbar点击
			changeTab(index) {
				this.tabIndex = index
			},
			// swiper滑动
			changeSwiper(e) {
				this.tabIndex = e.detail.current
			},
			// scroll-view触底
			reachBottom() {
				// 是否可加载
				if (this.followList.loadStatus !== 'loadmore') return;
				// 加载更多
				this.followList.loadStatus = "loading"
				setTimeout(() => {
					this.getList()
				}, 1000);
			},
			// 获取列表
			getList(idx) {
				// 随机添加5条数据
				for (let i = 0; i < 5; i++) {
					let index = this.$u.random(0, this.followList.list.length - 1)
					let data = JSON.parse(JSON.stringify(this.followList.list[index]))
					this.followList.list.push(data)
				}
				// 更新加载状态
				this.followList.loadStatus = "nomore"
			},
			// 搜索
			goSearch() {
				this.$u.route('/pages/home/search', {
					type: 'topic'
				})
			},
			openSearchList(value) {
				uni.navigateTo({
					url: 'cpns/law-search-detail?lawType=' + value
				})
			},
			//一级分类列表
			queryLawType() {
				queryLawType().then(res => {
					this.lawTypes = res.data
					console.log(res.data);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title-color {
		color: #f92a28;
		background-color: #F4F4F4;

	}

	@keyframes box-active {
		from {
			background-size: 0 0;
		}

		to {
			background-size: 200% 200%;
		}
	}

	.news {

		// 导航栏
		/deep/ .u-navbar {

			.iconfont {
				font-size: 48rpx;
				color: $uni-color-green;
			}

			.nav-center {
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
					width: 120rpx;
					font-size: 30rpx;
					padding: 0 15rpx;
					font-weight: bold;
					color: $uni-text-color-gray;
				}

				.active {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;

					.nav-title {
						color: $uni-color-green;
					}

					.active-line {
						border-bottom: 8rpx solid $uni-color-green;
						border-radius: 20rpx;
						width: 70rpx;
						position: absolute;
						bottom: -10rpx;
						left: 50%;
						margin-left: -35rpx;
					}
				}

			}
		}

		.topic {
			.search-input {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				height: 70rpx;
				background-color: #F4F4F4;
				border-radius: 10rpx;

				/deep/ .u-input {
					height: 100%;
				}
			}

			.last-update {
				padding: 20rpx;

				.last-update-name {
					font-size: 32rpx;
					padding-bottom: 5rpx;
				}
			}

		}

		.search-bar {
			width: 100%;
			height: 40px;
			border-bottom: 2px #e9e9e9 solid;
			border-top: 1px #e9e9e9 solid;
			display: flex;
			justify-content: center;
			font-size: 28rpx;

			/deep/ .u-form {
				width: 100%;

				.u-form-item__body__right__content__slot {
					height: 100%;
				}

				.u-checkbox-label--left {
					width: calc(50% - 0.5px);
					justify-content: center;
					border-right: 0.5px solid #d3d3d3;
				}

				.u-form-item {
					align-items: center;
					height: 100%;

					.u-form-item__body {
						width: 100%;
						padding: 0;
						height: 100%;

						.u-checkbox-group--row {
							height: 100%;
							justify-content: space-around;

						}
					}
				}
			}
		}

		.law-type {
			width: 100%;
			height: 42px;
			border-bottom: 2px #e9e9e9 solid;
			// border-top: 1px #e9e9e9 solid;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
		}

		.search-center {
			height: calc(100% - 40px);
			display: flex;
			justify-content: left;

			.search-center-left {
				height: 100%;
				width: 26%;
				border-right: 2px solid #e9e9e9;
			}

			.search-center-right {
				height: 100%;
				width: 74%;

				.search-center-right-list {
					padding: 10px 9px;
					height: calc(100% - 20px);
					width: calc(100% -10px);
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					align-content: flex-start;


					.law-kinds {
						width: 80px;
						box-sizing: border-box;
						height: 50px;
						padding: 3px;
						text-align: center;
						background-color: #FFF;
						line-height: 40px;
						margin-bottom: 15px;
						font-size: 28rpx;
						border-radius: 10px;
						border: #d3d3d3 1px solid;
						box-shadow: 0px 0px 2px #d3d3d3 inset;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;

					}

					.law-kinds:active {
						background-color: #F4F4F4;
					}


				}
			}
			.search-center-right-list::after{
				content: '';
				width: 80px;
			}
			
		}

		.swiper {
			height: calc(100% - 44px);

		}
	}
</style>