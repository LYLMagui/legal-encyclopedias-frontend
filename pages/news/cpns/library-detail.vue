<template>
	<page-meta :page-style="'overflow:'+(catalogShow?'hidden':'visible')"></page-meta>
	<view class="Box" :style="{'margin-top':barHeight+'px'}">

		<view class="pagbg anmt" z-index="99999" :style="{backgroundColor:pageBg}"></view>

		<u-navbar :bgColor="narbgColor" :fixed="true" :safeAreaInsetTop="true" autoBack="true"
			:titleStyle="{ color: barFontColor }" :title="item.title" leftIconSize='26px'>
		</u-navbar>

		<view class="sview" :style="{color:textColor,fontSize:forUpx(size)+'px',lineHeight:forUpx(lineHeight)+'px'}">
			<!-- 正文标题 -->
			<view class="law-title">{{item.title}}</view>
			<!--  -->
			<view class="content-info">
				<text v-if="item.origin !== null">{{item.origin}}</text>
				<text>{{item.updataTime}}</text>
			</view>
			<text class="content-article" style="text-align: justify;">{{item.content}}</text>
		</view>
	</view>


</template>
<script>
	var interval, timeInter, dianliangInter;
	import zhuti from "@/zhuti";
	import {
		queryLegalContent
	} from '@/utils/api/legalApi.js'
	export default {
		data() {
			return {
				section_title: '', //章节标题
				//正文
				show: false, //菜单display
				dqzhuti: 1, //当前主题
				zhutiList: zhuti.data, //主题列表
				fontColor: 'rgb(100,103,120)', //菜单字体颜色
				pageBg: '#f4f3f9', //页面背景色
				menuBg: '#fff', //菜单背景色
				textColor: '#000', //富文本文字颜色
				statusBarHeight: '',
				barFontColor: '#646778', //导航栏字体颜色


				size: uni.getStorageSync('fontsize') ? uni.getStorageSync('fontsize') : 30, //正文字体大小
				lineHeight: uni.getStorageSync('lineHeight') ? uni.getStorageSync('lineHeight') : 50, //正文行间距
				showBar: true, //显示导航栏
				narbgColor: "#F7F7F7", // 导航栏背景颜色
				borderShow: true,
				type: 'top',
				chapterList: [],
				barHeight: 0,
				content: '',
				indexList: ["A", "B", "C"],
				itemArr: this.content_text,
				item: {}, //传递过来的对象
				contentData: [],
			}
		},
		onUnload() {},
		created() {
			console.log("create");
			uni.hideNavigationBarLoading()
			var this_ = this;
			//获取状态栏高度给顶部占位节点
			// plus.navigator.setFullscreen(true);
			var zt = uni.getStorageSync('zhuti'); //主题索引
			if (zt) {
				this.dqzhuti = zt;
				this.fontColor = zhuti.data[zt].fontColor; //菜单字体颜色
				this.pageBg = zhuti.data[zt].pageBg; //页面背景色
				this.menuBg = zhuti.data[zt].menuBg; //菜单背景色
				this.textColor = zhuti.data[zt].textColor; //富文本文字颜色
			} else {
				this.dqzhuti = 0;
				this.fontColor = zhuti.data[0].fontColor; //菜单字体颜色
				this.pageBg = zhuti.data[0].pageBg; //页面背景色
				this.menuBg = zhuti.data[0].menuBg; //菜单背景色
				this.textColor = zhuti.data[0].textColor; //富文本文字颜色
			}
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight + 'px';
				}
			})
		},
		onHide() {
			//页面隐藏的时候将通知栏显示出来
			this.showBar = true
		},
		onLoad(option) {
			let item = JSON.parse(option.item)
			this.item = item
		},
		methods: {
			//获得状态栏高度
			getSystemStatusBarHeight() {
				this.barHeight = uni.getSystemInfoSync().statusBarHeight
				console.log(this.barHeight)
			},



			toggle() {
				this.catalogShow = true;
			},
			//修改正文字体大小
			changeFontSize(e) {
				this.size = e.detail.value;
				uni.setStorageSync('fontsize', e.detail.value);
			},
			//修改正文行间距
			changeLineHeight(e) {
				this.lineHeight = e.detail.value;
				uni.setStorageSync('lineHeight', e.detail.value);
			},
			//目录
			mulu() {
				this.catalogShow = false

			},
			back() {
				uni.navigateBack({});
			},


			forUpx(e) {
				return uni.upx2px(e)
			}
		}
	}
</script>
<style lang="scss">
	@font-face {
		font-family: "iconfont";
		src: url('../../../font/dianliang.ttf') format('truetype');
	}

	.law-title {
		width: 100%;
		font-size: 48rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		margin: 40rpx 0px 20rpx 0;
	}

	.law-detail {
		width: 180rpx;
		text-align-last: justify;
		font-size: 32upx;
		display: inline-block;
	}

	.content-article {
		font-family: 'txjl';
	}

	.detailBottom {
		margin-bottom: 10px;
	}

	.law-detail-title {
		text-align: center;
		font-size: 38upx;
		font-weight: 500;
	}

	.law-detail-content {
		display: inline-block;
		font-size: 30upx;
		text-align: left;
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-80dianliang:before {
		content: "\e617";
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 48rpx;
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}


	.content-info {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		text-align: center;

		text {
			text-align: center;
			font-size: 28rpx;
			color: #94999d;
		}
	}

	.pagbg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.zuizhong.active {
		opacity: 1;
		position: fixed;
		width: 100upx;
		text-align: center;
		font-size: 30upx;
		font-weight: bold;
		color: #ec706b;
		transform: translateX(50%) scale(0.7);
		right: 80upx;
		-webkit-transition: all 0.5s;
		z-index: 9
	}

	.zuizhong {
		opacity: 0;
		position: fixed;
		width: 100upx;
		text-align: center;
		font-size: 20upx;
		font-weight: bold;
		color: #ec706b;
		right: 80upx;
		transform: translateX(50%) scale(0.1);
		-webkit-transition: all 0.5s;
		transition: all 0.5s;
		z-index: 9
	}


	.back {
		width: 40upx;
		height: 40upx;
		margin: 0 40upx;
	}

	.sview {
		width: calc(100% - 80upx);
		font-size: 45upx;
		line-height: 90upx;
		position: relative;
		/* text-indent: calc(2em + 12upx); */
		margin: 0 auto;
		z-index: 5;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		padding: 40rpx 40rpx;
		text-align: justify;
		margin-top: 100rpx;
	}




	page {
		letter-spacing: 6upx;
		display: flex;
	}

	.topBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
	}

	.bottomBox {
		padding: 0 0 20upx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		opacity: 1;
		z-index: 9;
	}

	.bottomBox .ddd>view {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		line-height: 40upx;
	}

	.bottomBox .ddd image {
		width: 40upx;
		height: 40upx;
	}

	@font-face {
		font-family: "ydiconfont";
		src: url('https://at.alicdn.com/t/font_1282539_9h0uwv1sxps.ttf') format('truetype');
		/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	}





	.anmt {
		transition: all 0.5s;
	}


	.zhongMenu {
		top: 50%;
		position: fixed;
		left: 0;
		width: 100%;
		height: 50%;
		transform: translateY(-50%);
		z-index: 9;
	}

	.list-parent {
		width: 50vw;
		overflow: scroll;
	}

	//防止滚动穿透
	.scroll-lock {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;
	}

	.Box {
		overflow: hidden
	}

	.list_scroll {
		height: 100%;
	}

	.preface {
		white-space: pre-wrap;
	}

	.preface-box {
		margin: 20px 0;
	}

	.content-text {
		width: 100%;
	}

	.content-text text {
		white-space: pre-wrap;
		display: inline-block;
	}

	.content-text text .articleNo {
		font-weight: 600;
		white-space: pre-wrap;
	}
</style>