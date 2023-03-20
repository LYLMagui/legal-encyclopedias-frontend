<template>
	<view class="read" id="read">
		<view class="read-content" :class="'read-content'+index" :style="elStyle" v-for="(item,index) in list"
			:key="index" @click="toClick">
			{{item.content}}
		</view>
		<!-- <view class="read-content" :style="elStyle" @click="toNext">{{content}}</view>
		<view class="read-content-next" :style="elStyle">{{contentNext}}</view> -->


		<view class="top-info" v-if="setShow">
			<view class="top-info-item">
				<text text="上一章" block align="center" v-if="partInfo.previousPartNum != -1"
					@tap.native.stop="toPrePart">上一章
				</text>
			</view>
			<view class="top-info-item">
				<!-- <u-button type="default" size="mini" plain shape="circle" text="目录" @tap.native.stop="toMenu">
				</u-button> -->
				<text text="目录" align="center" @tap.native.stop="toMenu">目录</text>
			</view>
			<view class="top-info-item">
				<text text="下一章" align="center" v-if="partInfo.nextPartNum != -1" @tap.native.stop="toNextPart">下一章
				</text>
			</view>
		</view>
		<view class="bottom-info" v-if="setShow">
			<view class="bottom-info-item">
				<text text="设置" prefixIcon="setting" size="17" lineHeight="20" :iconStyle="{fontSize: '20px'}"
					align="center" @tap.native.stop="toSet">设置</text>
			</view>
			<view class="bottom-info-item">
				<text text="|" align="center" size="17" color="#dadada">|</text>
			</view>
			<view class="bottom-info-item">
				<text text="返回书城" prefixIcon="home" size="17" lineHeight="20" align="center"
					:iconStyle="{fontSize: '20px'}" @tap.native.stop="toHome">返回书城</text>
			</view>
		</view>
		<view class="bottom-info font-style" v-if="setStyleShow">
			<view class="item">
				<view class="item-title">
					字号
				</view>
				<view class="item-cont">
					<view class="item-cont-item" @click="setFontSize(1)">
						-
					</view>
					<view class="item-cont-item" @click="setFontSize(2)">
						+
					</view>
				</view>
			</view>
			<view class="item">
				<view class="item-title">
					背景
				</view>
				<view class="item-cont">
					<view class="item-cont-item" :class="curColor==item?'active':''" @click="setBgColor(item)"
						v-for="(item,index) in colors" :key="index" :style="'background-color:'+item+';'">

					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import datas from "./data.js"
	export default {
		data() {
			return {
				content: "22222",
				contentPre: "11111",
				contentNext: "3333",
				list: [],
				colors: [
					"#F1FAFA",
					"#e8ffe8",
					"#e8e8ff",
					"#8080c0",
				],
				curColor: "#F1FAFA",
				setShow: false,
				setStyleShow: false,
				isStart: true,
				isEnd: false,
				width: 0,
				height: 0,
				start: 0,
				end: 0,
				length: 0,
				heightOffset: 16,
				styleObj: {
					fontSize: 16,
					lineHeight: 1
				},
				elStyle: "",
				partInfo: {
					previousPartNum: 1,
					nextPartNum: 1
				}
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.init()

			})

		},
		methods: {
			setFontSize(flag) {
				//-
				if (flag == 1) {
					if (this.styleObj.fontSize < 10) {
						return;
					}
					this.styleObj.fontSize -= 1;
				} else { //+
					if (this.styleObj.fontSize > 40) {
						return;
					}
					this.styleObj.fontSize += 1;
				}
				this.init()
			},
			setBgColor(color) {
				this.curColor = color;
				this.setStyle()
			},
			toSet() {
				console.log("设置")
				this.setStyleShow = true;
				this.setShow = false;
			},
			toPrePart() {
				console.log("上一章节")
			},
			toNextPart() {
				console.log("下一章节")
			},
			toHome() {
				console.log("返回首页")
			},
			toMenu() {
				// this.$refs.parts.open();
				console.log("显示目录")
			},
			toClick(e) {
				if (this.setStyleShow || this.setShow) {
					this.setStyleShow = false;
					this.setShow = false;
					return;
				}
				const width = this.width;
				const x = e.detail.x;
				if (x < width / 3) {
					this.toPre()
				} else if (x > (width / 3) * 2) {
					this.toNext()
				} else {
					this.setShow = !this.setShow;
				}
			},
			toPre() {

				if (this.isStart) {
					uni.showToast({
						title: "已经是第一页了",
						icon: "none"
					})
					return;
				}

				this.start -= this.length;
				this.setContent()
			},
			toNext() {
				if (this.isEnd) {
					uni.showToast({
						title: "已经是最后一页了",
						icon: "none"
					})
					return;
				}
				this.start += this.length;
				this.setContent()
				// console.log(this.start, this.list)
			},
			init() {
				console.log(111111111, this.content)
				const query = uni.createSelectorQuery().in(this);
				const el = query.select("#read").boundingClientRect(data => {
					console.log(11111, data)

					const width = data.width - 20;
					const height = data.height - 20;
					this.width = width;
					this.height = height;

					let lineHeight = ((this.styleObj.fontSize) * this.styleObj.lineHeight) + this.heightOffset;
					let lineNum = parseInt(height / lineHeight) - 1;
					let fonts = parseInt(width / (this.styleObj.fontSize));
					let allFonts = lineNum * fonts;
					this.length = allFonts;
					console.log("--->>>", allFonts, fonts, lineNum, height, lineHeight)
					this.setStyle()
					this.setContent()
				}).exec();

			},
			setContent() {
				this.list = []
				let cont0 = "";
				let cont1 = datas.substr(this.start, this.length);
				let cont2 = datas.substr(this.start + this.length, this.length);
				if (cont1.length < this.length) {
					this.isEnd = true;
				} else {

					this.isEnd = false;
				}
				if (this.start != 0) {
					this.isStart = false;
					cont0 = datas.substr(this.start - this.length, this.length)
				} else {
					this.isStart = true;
				}
				this.list.push({
					index: 0,
					content: cont0
				})
				this.list.push({
					index: 1,
					content: cont1
				})
				this.list.push({
					index: 2,
					content: cont2
				})
			},
			setStyle() {
				let fontSize = this.styleObj.fontSize;
				let lineHeight = (((this.styleObj.fontSize) * this.styleObj.lineHeight) + this.heightOffset);

				this.elStyle = `font-size: ${fontSize}px;line-height: ${lineHeight}px;background-color:${this.curColor};`;
				// console.log(1,this.elStyle)
			}
		},
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	* {
		box-sizing: border-box;
	}

	.read {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;


		&-content {
			padding: 20rpx;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			position: absolute;
			background-color: #f5ebdc;
		}

		&-content0 {
			z-index: 1;
		}

		&-content1 {
			z-index: 20;
		}

		&-content2 {
			z-index: 10;
		}
	}


	.top-info {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		display: flex;
		background-color: #fff;
		height: 90rpx;
		border-bottom: 1px solid #dadada;
		width: 100%;
		z-index: 999;

		&-item {
			padding: 10rpx 0rpx;
			flex: 1;
			text-align: center;
		}
	}



	.bottom-info {
		position: absolute;
		box-sizing: border-box;
		bottom: 0rpx;
		left: 0rpx;
		display: flex;
		background-color: #fff;
		height: 210rpx;
		padding: 50rpx 30rpx;
		border-top: 1px solid #dadada;
		width: 100%;
		z-index: 999;

		&-item {
			padding: 10rpx 0rpx;
			flex: 1;
			text-align: center;
		}
	}

	.font-style {
		height: 400rpx;
		flex-direction: column;
	}

	.item {
		display: flex;
		padding: 20rpx;
		height: 150rpx;
		line-height: 110rpx;

		&-title {
			width: 140rpx;
		}

		&-cont {
			width: calc(100% - 140rpx);
			display: flex;

			&-item {
				flex: 1;
				background-color: #d8ebf5;
				height: 100rpx;
				border-radius: 60rpx;
				margin-right: 30rpx;
				text-align: center;
				font-size: 60rpx;
				line-height: 90rpx;
				color: #03a9f4;
			}

			.active {
				border: 1px solid #03a9f4;
			}
		}
	}
</style>
