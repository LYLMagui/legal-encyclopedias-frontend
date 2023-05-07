<template>
	<!-- 三方登录 -->
	<view class="other-login">
		<!-- #ifdef MP-WEIXIN -->
		<view class="login-wx">
			<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" size="mini">微信登录</button>
		</view>

		<!-- #endif -->
	</view>
</template>

<script>
	import {
		login,
	} from "@/utils/api/user.js";
	export default {
		data() {
			return {
				providerList: [],
			}
		},
		mounted() {

		},
		methods: {
			// 登录
			tologin(provider) {
				// 一键登录已在APP onLaunch的时候进行了预登陆，可以显著提高登录速度。登录成功后，预登陆状态会重置
				uni.login({
					provider: provider.id,

					success: async (res) => {
						console.log('login success:', res);
						
						this.Toast({
							title: '登录成功'
						})
						// 更新保存在 store 中的登录状态
						this.login(provider.id);



						// #ifdef MP-WEIXIN
						console.warn('如需获取openid请参考uni-id: https://uniapp.dcloud.net.cn/uniCloud/uni-id')
						uni.request({
							url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/user-center',
							method: 'POST',
							data: {
								action: 'loginByWeixin',
								params: {
									code: res.code,
									platform: 'mp-weixin'
								}
							},
							success(res) {
								console.log(res);
								if (res.data.code !== 0) {
									console.log('获取openid失败：', res.data.errMsg);
									return
								}
								uni.setStorageSync('openid', res.data.openid)
							},
							fail(err) {
								console.log('获取openid失败：', err);
							}
						})
						// #endif
					},
					fail: (err) => {
						console.log('login fail:', err);

						// 一键登录点击其他登录方式
						if (err.code == '30002') {
							uni.closeAuthView();
							this.Toast({
								title: '其他登录方式'
							})
							return;
						}

						// 未开通
						if (err.code == 1000) {
							uni.showModal({
								title: '登录失败',
								content: `${err.errMsg}\n，错误码：${err.code}`,
								confirmText: '开通指南',
								cancelText: '确定',
								success: (res) => {
									if (res.confirm) {
										setTimeout(() => {
											plus.runtime.openWeb(
												'https://ask.dcloud.net.cn/article/37965'
											)
										}, 500)
									}
								}
							});
							return;
						}

						// 一键登录预登陆失败
						if (err.code == '30005') {
							uni.showModal({
								showCancel: false,
								title: '预登录失败',
								content: this.univerifyErrorMsg || err.errMsg
							});
							return;
						}

						// 一键登录用户关闭验证界面
						if (err.code != '30003') {
							uni.showModal({
								showCancel: false,
								title: '登录失败',
								content: JSON.stringify(err)
							});
						}
					},
					complete: () => {
						this.univerifyBtnLoading = false;
					}
				})
			},

			// 小程序获取用户信息
			getUserInfo(res) {
				uni.showLoading({
					title: '登录中...',
					mask: true
				})
				// 失败
				if (res.detail.errMsg !== 'getUserInfo:ok') {
					uni.hideLoading()
					return uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					})
				}
				// 成功
				let userInfo = res.detail.userInfo
				console.log(userInfo);
				uni.login({
					provider: 'weixin', // 登录供商	
					success(res) {
						console.log(res)
						// 请求后端接口
						const params = {
							code: res.code,
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatarUrl,
							userName: "",
							password: "",
							registerType: "wx"
						}
						uni.removeStorageSync("token")
						login(params).then(res => {
							let data = res.data
							//存储token
							uni.setStorageSync("token",data.token)
							uni.hideLoading()
							uni.showToast({
								mask:true,
								title:data.message,
								success() {
									if(data !== null){
										setTimeout(()=>{
											uni.redirectTo({
												url:'/pages/news/news'
											})
										},500)
									}else{
										return
									}
								},
								fail() {
									
									uni.hideLoading()
									
									return
								}
							})
						}).catch(e => {
							uni.hideLoading()
						})
					},
					complete() {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.other-login {
		.login-method {
			padding-top: 30rpx;

			.method-img {
				width: 80rpx;
				height: 80rpx;
			}
		}

		.login-wx {
			flex: 1;
			margin: 0 auto;
			width: 200rpx;
		}
	}
</style>