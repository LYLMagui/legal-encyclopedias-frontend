<template>
	<!-- 首页/搜索页 -->
	<view class="search">
		<!-- 小程序导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar placeholder autoBack>

			<view slot="center" class="nav-center">
				<u-search placeholder="请输入内容或标题" showAction="true" v-model="keyword" @custom="search()"></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<view class="back-wall">
			
		</view>

		<!-- 资讯列表 -->
		<template v-if="type === 'info'">
			<info-list :item="item" v-for="(item,index) in list" :key="index">
			</info-list>
		</template>
		<!-- 话题列表 -->
		<template v-else-if="type === 'topic'">
			<topic-list :item="item" v-for="(item,index) in list" :key="index">
			</topic-list>
		</template>
		<!-- 用户列表 -->
		<template v-else-if="type === 'user'">
			<friend-list :item="item" v-for="(item,index) in list" :key="index">
			</friend-list>
		</template>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		searchList,
		newsList,
		friendList,
		topicList
	} from "@/utils/data/data.js"
	import InfoList from "@/pages/home/cpns/info-list.vue"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	import FriendList from "@/pages/paper/cpns/friend-list.vue"

	export default {
		components: {
			InfoList,
			TopicList,
			FriendList
		},
		data() {
			return {
				type: '', // user:用户 news:动态 topic:话题
				keyword: '',
				records: searchList,
				list: [],
				lawType: '', //法律类别
				lawTypes: [

					{
						value: 1,
						text: '中央法规'
					},
					{
						value: 2,
						text: '地方法规'
					},
					{
						value: 3,
						text: '立法资料'
					},
					{
						value: 4,
						text: '立法计划'
					},
					{
						value: 5,
						text: '中外条约'
					}
				],
			shwo:false
			}
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.search()
			}
		},
		// 监听原生标题栏搜索输入框输入内容变化事件
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		// 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onLoad(e) {
			this.type = e.type
			// #ifdef APP-PLUS
			this.editNavPlaceholder()
			// #endif
		},
		methods: {
			// 搜索
			search() {
				console.log("开始搜索");
				// 数据校验
				if (this.keyword === '') {
					return this.$refs.uToast.show({
						type: 'error',
						message: '请输入搜索内容'
					})
				}
				// 收起键盘
				uni.hideKeyboard()
				// 加载中
				uni.showLoading({
					title: '加载中',
				})
				setTimeout(() => {
					uni.hideLoading()
					switch (this.type) {
						case 'user':
							this.list = friendList[0].list
							break
						case 'info':
							this.list = newsList[0].list
							break
						case 'topic':
							this.list = topicList[0].list
							break
					}
				}, 1000)
			},
			// 删除记录
			delRecord(type, index = 0) {
				if (type === 'all') return this.records = []
				else return this.records.splice(index, 1)
			},
			// 编辑状态
			editState(index) {
				this.records[index].edit = this.records[index].edit ? !this.records[index].edit : true
			},
			// 修改导航栏输入框占位符
			editNavPlaceholder() {
				// 修改原生导航栏：搜索框占位符
				let pageTitle = '请输入内容'
				switch (this.type) {
					case 'user':
						pageTitle = '请输入昵称'
						break
					case 'info':
						pageTitle = '请输入新鲜事'
						break
					case 'topic':
						pageTitle = '请输入话题'
						break
				}
				const currentWebview = this.$mp.page.$getAppWebview() // 获取当前窗口对象实例
				const tn = currentWebview.getStyle().titleNView // 获取原生导航栏
				tn.searchInput.placeholder = pageTitle // 设置占位符
				currentWebview.setStyle({
					titleNView: tn
				})
			},
			lawTypeChange() {
				this.$refs.uToast.show({
					message: this.lawType
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.card {
		height: 100%;
	}

	.back-wall {
		width: 100%;
		height: 55px;
		background-color: #efefef;
	}

	.search {

		// 小程序导航栏
		/* #ifdef MP-WEIXIN */
		/deep/ .u-navbar {

			.u-navbar__content {
				margin-right: 180rpx !important; // 胶囊按钮
			}

			.nav-center {
				width: 100%;
				margin-left: 80rpx; // 返回按钮
			}
		}

		/* #endif */
		.items-center {}

		.close-tag {
			position: absolute;
			top: -15rpx;
			right: -5px;
		}

	}
</style>