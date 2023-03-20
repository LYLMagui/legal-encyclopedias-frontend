<template>
	<!-- 我的/设置/修改资料 -->
	<view class="edit-info wrap-card">
		<u-cell-group :border='false'>
			<u-cell title="头像" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleHeader">
				<image slot="value" class="header-img" :src="form.avatar" mode="aspectFill"></image>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="昵称" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleName">
				<view slot="value">
					{{form.username}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="性别" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleSex">
				<view slot="value">
					{{sexList[form.sex]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="生日" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}">
				<view slot="value">
					<uni-datetime-picker ref="birth" type="date" :clear-icon="false" v-model="form.birth">{{form.birth}}
					</uni-datetime-picker>
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF" @click="handleBirth"></u-icon>
			</u-cell>
			<u-cell title="情感" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleEmotion">
				<view slot="value">
					{{emoList[form.emotion]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="职业" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleJob">
				<view slot="value">
					{{jobList[form.job]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="家乡" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="showCity">
				<view slot="value">
					{{form.city}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
		</u-cell-group>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit">完成</u-button>
			</view>
		</view>
		<!-- 昵称 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入昵称" :value="form.username" placeholder="请输入内容"
				@confirm="nameConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 城市选择 -->
		<city-picker themeColor="#007AFF" ref="cityPicker" :pickerValueDefault="cityDefault" @onConfirm="confirmCity">
		</city-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					avatar: '/static/img/header/a.svg',
					username: 'MrThinco',
					sex: 0,
					emotion: 1,
					job: 0,
					birth: '2020-10-10',
					city: '四川成都'
				},
				sexList: ['男', '女', '保密'],
				emoList: ['未婚', '已婚', '离异', '保密'],
				jobList: ['软件工程师', '维修工程师', '运维工程师', '测试工程师'],
				cityDefault: [0, 0, 1],
				// 按钮配置
				btnStyle: {
					width: "90%",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
			}
		},
		methods: {
			// 修改头像
			handleHeader() {
				// 选择图片
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						this.form.avatar = res.tempFilePaths[0]
					}
				})
			},
			// 修改昵称
			handleName() {
				this.$refs.inputDialog.open()
			},
			nameConfirm(val) {
				this.form.username = val
			},
			// 修改性别
			handleSex() {
				const _this = this
				uni.showActionSheet({
					itemList: this.sexList,
					success: function(res) {
						_this.form.sex = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			// 修改生日
			handleBirth() {
				this.$refs.birth.show()
			},
			// 修改情感
			handleEmotion() {
				const _this = this
				uni.showActionSheet({
					itemList: this.emoList,
					success: function(res) {
						_this.form.emotion = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			// 修改职业
			handleJob() {
				const _this = this
				uni.showActionSheet({
					itemList: this.jobList,
					success: function(res) {
						_this.form.job = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg)
					}
				})
			},
			// 修改城市
			confirmCity(e) {
				console.log('e', e)
				this.form.city = e.label
			},
			showCity() {
				this.$refs.cityPicker.show()
			},
			// 提交
			submit() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-info {
		.header-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			margin-right: 10rpx;
		}
	}
</style>
