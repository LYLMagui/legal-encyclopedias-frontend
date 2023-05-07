<template>
	<page-meta :page-style="'overflow:'+(catalogShow?'hidden':'visible')"></page-meta>
	<view class="Box" :style="{'margin-top':barHeight+'px'}">
		<!-- 网页背景开始 -->
		<view class="pagbg anmt" z-index="99999" :style="{backgroundColor:pageBg}"></view> -->
		<view class="zhongMenu" @click="dianjile()"></view>
		<!-- 网页背景结束
		<!-- 带返回键的导航栏开始 -->
		<u-status-bar></u-status-bar>
		<u-navbar :bgColor="narbgColor" :fixed="true" :safeAreaInsetTop="true" autoBack="true"
			:titleStyle="{ color: barFontColor }" title="中国人民共和国国立宪法(2023修正)" leftIconSize='26px'>
		</u-navbar>
		<!-- 带返回键的导航栏结束 -->

		<!-- 菜单开始 -->
		<view class="bottomBox anmt" :style="{color:fontColor,backgroundColor:menuBg,bottom:show?'0':'-150px'}">
			<view style="overflow: hidden;">
				<view style="float: left;width: 50%;overflow: hidden;">
					<view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">字体
					</view>
					<view
						style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
						<slider style="width: 100%;" :value="size" min="20" max="100" @changing="changeFontSize"
							@change="changeFontSize" :activeColor="fontColor" :backgroundColor="pageBg"
							:block-color="fontColor" block-size="20" />
					</view>
				</view>
				<view style="float: left;width: 50%;overflow: hidden;">
					<view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">间距
					</view>
					<view
						style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
						<slider style="width: 100%;" :value="lineHeight" min="50" max="150" @changing="changeLineHeight"
							@change="changeLineHeight" :activeColor="fontColor" :backgroundColor="pageBg"
							:block-color="fontColor" block-size="20" />
					</view>
				</view>
			</view>
			<view style="overflow: hidden;">
				<view style="float: left;width: 15%;line-height: 100upx;text-align: center;font-size: 24upx;">背景</view>
				<view style="float: left;width: 85%;height: 100upx;display: flex;">
					<view class="sekuai" v-for="(item,index) in zhutiList" @tap="qiehuan(index)" :key="item.name"
						:style="{backgroundColor:item.pageBg,borderColor:dqzhuti==index?item.fontColor:'rgba(0,0,0,0)'}"
						v-if="index!=1&&index!=2"></view>
				</view>
			</view>
			<view style="width: 100%;display: flex;" class="ddd">
				<!-- <view @click="mulu()">
					<view><text class="tficon">&#xe671;</text></view>
					<view>目录</view>
				</view> -->
				<view @click="qiehuan(dqzhuti==1?0:1)">
					<view><text class="tficon">{{dqzhuti==1?'&#xe699;':'&#xe612;'}}</text></view>
					<view>{{dqzhuti==1?'白天':'夜间'}}</view>
				</view>
				<view @click="qiehuan(dqzhuti==2?0:2)" :style="dqzhuti==2?'color:green':''">
					<view><text class="tficon">&#xe639;</text></view>
					<view>护眼</view>
				</view>
			</view>
		</view>
		
		<view class="sview" :style="{color:textColor,fontSize:forUpx(size)+'px',lineHeight:forUpx(lineHeight)+'px'}">
			<view class="law-title">{{item.legalName}}</view>
			<!-- <view>
				<view class="law-detail">效力位阶</view>:
				<text class="law-detail-content">法律</text>
			</view> -->
			<view>
				<view class="law-detail">制定机关</view>:
				<text class="law-detail-content">{{item.enactAgency}}</text>
			</view>
			<view>
				<view class="law-detail">时效性</view>:
				<text class="law-detail-content">{{item.activity}}</text>
			</view>
			<view>
				<view class="law-detail">发文字号</view>:
				<text class="law-detail-content">{{item.documentNumber === null ? '' : item.documentNumber}}</text>
			</view>
			<view>
				<view class="law-detail">公布日期</view>:
				<text class="law-detail-content">{{item.publishTime}}</text>
			</view>
			<view>
				<view class="law-detail detailBottom">施行日期</view>:
				<text class="law-detail-content">{{item.startTime}}</text>
			</view>

			<view>
				<view class="law-detail-title">目录</view>
				<view v-if="item.preface !== null ? true : false">序言</view>
				<view v-for="(item,index) in contentData">{{item.chapter}} {{item.chapterTitle}}
				<view style="width: 100%;white-space: pre;"  v-for="(item1,index) in item.sections">{{"    第" + convertNumber(item1.sectionNo)}}节 {{item1.sectionTitle}}</view>
				</view>
			</view>
			<view v-if="item.preface !== null ? true : false" class="preface-box">
				<view style="text-align: center;">序言</view>
				<text class="preface">{{item.preface}}</text>
			</view>
			<view class="content-text">
				<view style="margin-bottom: 10px;" v-for="(item,index) in contentData">
					<view style="text-align: center; font-weight: bold;">{{item.chapter}} {{item.chapterTitle}}</view>
					<view v-if="item.sections.length === 0 ? false : true" v-for="(item3,index3) in item.sections">
						<view style="text-align: center;">第{{convertNumber(item3.sectionNo)}}节 {{item3.sectionTitle}}</view>
						<text v-for="(item4,index4) in item3.articles"><text
								class="articleNo">第{{convertNumber(item4.articleNo) + "条  "}}</text>{{item4.article}}</text>
					</view>
					<text v-for="(item1,index1) in item.articles"><text
							class="articleNo">{{item1.articleNo + "  "}}</text>{{item1.article}}</text>
				</view>
			</view>
			<!-- <u-parse :content="content"></u-parse> -->
			<!-- <text style="text-align: justify;">望着测验魔石碑上面闪亮得甚至有些刺眼的五个大字，少年面无表情，唇角有着一抹自嘲，紧握的手掌，因为大力，而导致略微尖锐的指甲深深的刺进了掌心之中，带来一阵阵钻心的疼痛…</text> -->
		</view>

		<!-- 左侧目录开始 -->

		<!-- End -->
		<!-- 小说正文结束 -->
	</view>


</template>
<script>
	var interval, timeInter, dianliangInter;
	import zhuti from '../../zhuti'
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
				pageBg: 'rgb(247,247,247)', //页面背景色
				menuBg: '#fff', //菜单背景色
				textColor: '#000', //富文本文字颜色
				statusBarHeight: '',
				barFontColor: '#646778', //导航栏字体颜色
				Dindex: '', //当前章节索引
				shuming: '斗破苍穹', //书名
				id: '', //本书ID
				battery: '', //电量
				systemTime: '', //系统时间
				catalogShow: false, //目录显示
				size: uni.getStorageSync('fontsize') ? uni.getStorageSync('fontsize') : 40, //正文字体大小
				lineHeight: uni.getStorageSync('lineHeight') ? uni.getStorageSync('lineHeight') : 70, //正文行间距
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
		onUnload() {
			// 页面卸载的时候清除定时器
			clearInterval(timeInter)
			clearInterval(dianliangInter)
			uni.hideLoading();

		},
		created() {
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
		onLoad(e) {
			this.item = JSON.parse(e.item)
			if (this.item.activity === 1) {
				this.item.activity = "有效"
			} else if (this.item.activity === 2) {
				this.item.activity = "尚未生效"
			} else {
				this.item.activity = "无效"
			}

			//通过法律编号获取内容
			this.getContent(this.item)
		},
		methods: {
			//阿拉伯数字转中文序号
			convertNumber(number) {
				const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
				const chineseUnits = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿'];
				const num = number.toString();
				const len = num.length;
				let result = '';
				for (let i = 0; i < len; i++) {
					const digit = parseInt(num[i]);
					if (digit === 0) {
						// 如果数字为0，跳过
						continue;
					}
					result += chineseNumbers[digit] + chineseUnits[len - 1 - i];
				}
				return result;
			},
			//获取法律内容
			getContent(param) {
				queryLegalContent(param).then(res => {
					console.log(res.data);
					let tempData = res.data
					tempData.forEach(c => {
						c.chapter = "第" + this.convertNumber(c.chapter) + "章"
						if(c.articles !== null){
							c.articles.forEach(a => {
								a.articleNo = "第" + this.convertNumber(a.articleNo) + "条"
							})
						}
					})
					this.contentData = tempData
				})
			},

			//获得状态栏高度
			getSystemStatusBarHeight() {
				this.barHeight = uni.getSystemInfoSync().statusBarHeight
				console.log(this.barHeight)
			},
			//选择章节
			selectChapter(index) {
				console.log(this.content_text[index].title);
				this.section_title = this.content_text[index].title
				this.content = this.content_text[index].content
				this.catalogShow = false
			},
			change(e) {
				uni.showToast({
					title: 'popup: ' + e.type + ' ,状态:' + e.show
				})
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
			dianjile() {
				this.show = !this.show;
				this.showBar = !this.showBar;
				this.borderShow = !this.borderShow

			},
			//切换主题
			qiehuan(e) {
				this.fontColor = zhuti.data[e].fontColor; //菜单字体颜色
				this.pageBg = zhuti.data[e].pageBg; //页面背景色
				this.menuBg = zhuti.data[e].menuBg; //菜单背景色
				this.textColor = zhuti.data[e].textColor; //富文本文字颜色
				uni.setStorageSync('zhuti', e);
				this.dqzhuti = e;
				if (this.dqzhuti) {
					this.narbgColor = zhuti.data[e].pageBg
					this.barFontColor = zhuti.data[e].fontColor
				} else {
					this.narbgColor = zhuti.data[e].pageBg;
					this.barFontColor = zhuti.data[e].fontColor
				}

			},
			//目录关闭
			cataClose() {
				this.catalogShow = false
			},
			//目录打开
			cataOpen() {
				this.catalogShow = true
			},

			getTimes() {
				var times = new Date();
				this.systemTime = (times.getHours() < 10 ? '0' + times.getHours() : times.getHours()) + ':' + (times
					.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes());
			},
			forUpx(e) {
				return uni.upx2px(e)
			}
		}
	}
</script>
<style>
	@font-face {
		font-family: "iconfont";
		src: url('../../font/dianliang.ttf') format('truetype');
	}

	.law-title {
		width: 100%;
		font-size: 52upx;
		text-align: center;
		display: flex;
		justify-content: center;
		margin: 20px 0px 10px 0;
	}

	.law-detail {
		width: 90px;
		text-align-last: justify;
		font-size: 32upx;
		display: inline-block;
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
		line-height: 24px;
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.pop {
		height: 100px;
		width: 100px;
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

	.quanquan {
		-webkit-box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
		box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
		position: fixed;
		right: 70upx;
		z-index: 9;
		border-radius: 50%;
		overflow: hidden;
		transform: translateX(50%) scale(0.5);
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
		padding: 20px 20px;
		text-align: justify;
	}

	.titlee {
		width: 100%;
		font-size: 45upx;
		line-height: 65upx;
		position: relative;
		z-index: 5;
		padding: 0 20upx 50upx;
		text-indent: -2.3em;
	}

	.tMain {
		display: flex;
		align-items: center;
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

	.tficon {
		font-family: ydiconfont;
		font-size: 34upx;
	}

	.guanggao {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 6;
		width: 100%;
	}

	.dianxin {
		position: absolute;
		top: 32.5%;
		left: 11%;
		width: 72%;
		height: 35%;
	}

	.dLiang {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.anmt {
		transition: all 0.5s;
	}

	.sekuai {
		width: 150upx;
		height: 100upx;
		background-color: #EC706B;
		border-radius: 12upx;
		border: 5upx solid #000;
		transform: scale(0.4);
		margin: -10upx -35upx 0;
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