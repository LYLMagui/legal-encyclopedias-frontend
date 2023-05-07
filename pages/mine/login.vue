<template>
	<!-- 我的/登录 -->
	<view class="login">
		<!-- 登录logo：猫头鹰蒙眼睛 -->
		<blindfold :show.sync="showEye"></blindfold>
		<!-- 登录表单 -->
		<view class="login-form wrap-card">

			<u--form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item prop="userName" label="账号" lable label-width="40px" borderBottom=true>
					<u--input :placeholder="loginType === '1' ? '请输入手机号/邮箱' : '请输入手机号/邮箱'" border="none"
						v-model="form.userName" placeholderStyle="{color:'#e4e5e9'}" :customStyle="{height:'70rpx'}"
						fontSize=15 clearable>
					</u--input>
				</u-form-item>

				<!-- 密码登录 -->
				<u-form-item prop="password" v-if="loginType === '1'" label="密码" label-width="40px" borderBottom=true>
					<u-input v-if="loginType === '1'" type="password" placeholder="请输入密码" border="none"
						v-model="form.password" placeholderStyle="{color:'#e4e5e9'}" :customStyle="{height:'80rpx'}"
						clearable @focus="hideEye(true)" @blur="hideEye(false)">
						<template slot="suffix">
							<text class="text-gray-400">
								忘记密码
							</text>
						</template>
					</u-input>
				</u-form-item>

				<!-- 验证码登录 -->
				<u-form-item v-if="loginType === '2'" prop="password" label="密码" label-width="40px" borderBottom=true>
					<u-input v-if="loginType === '2'" type="password" placeholder="请输入密码" border="none"
						v-model="form.password" placeholderStyle="{color:'#e4e5e9'}" :customStyle="{height:'80rpx'}"
						clearable @focus="hideEye(true)" @blur="hideEye(false)">
						<!-- <template slot="suffix">
						<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒后重新获取" keepRunning
							uniqueKey="login-form"></u-code>
						<u-button @tap="getCode" :text="tips" type="success"></u-button>
					</template> -->
					</u-input>
				</u-form-item>
			</u--form>

		</view>
		<!-- 登录按钮 -->
		<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="loginType === '1' ? submit() : signIn()"
			:disabled="btnDisabled">{{loginType === '1' ? '登录' : '注册'}}
		</u-button>
		<!-- 登录切换 -->
		<view class="flex justify-center items-center mt-50 text-green-400">
			<view class="" @click="changeType()">
				{{loginType === '1' ? '注册' : '密码登录'}}
			</view>
			<view class="mx-20">
				<u-line length="20rpx" color="#d6d7d9" direction="col"></u-line>
			</view>
			<view class="">
				登录遇到问题
			</view>
		</view>
		<!-- 社交账号登录 -->
		<!-- <other-login class="px-50"></other-login> -->
		<!-- 协议 -->
		<view class="text-center fixed bottom-0 left-0 right-0 mb-20">
			<text class="text-gray-400">注册即代表您同意</text><text
				class="text-green-400 underline underline-offset-2">《法律科普小程序协议》</text>
		</view>
	</view>
</template>

<script>
	import {
		login,
		register
	} from '@/utils/api/user.js';
	import form from '../../uni_modules/uview-ui/libs/config/props/form';
	import debounce from '../../uni_modules/uview-ui/libs/function/debounce';
	import {
		throttle
	} from "@/utils/api/tool.js"
	import icon from '../../uni_modules/uview-ui/libs/config/props/icon';
	import {
		getPublicKey
	} from '@/utils/lib/openssl.js';
	import JSEncrypt from 'jsencrypt';
	export default {
		data() {
			return {
				inputStyle: {
					height: '20px'
				},
				loginType: '1', // 1:登录密码 2:注册密码
				tips: '',
				errorType: 'message',
				showEye: false,
				form: {
					userName: '',
					password: '',
					registerType: 'zh'
				},
				btnStyle: {
					width: "90%",
					height: "100rpx",
					marginTop: '50rpx',
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
				//验证规则，参考https://www.uviewui.com/components/form.html
				rules: {
					'userName': {
						required: true,
						message: '账号必须是11-20个字符或数字',
						min: 11,
						max: 20,
					},
					'password': [{
							required: true,
							message: '密码不能为空',
						},
						{
							min: 8,
							message: '密码长度不能少于8位'
						},
						{
							max: 20,
							message: '密码长度不能多于20位'
						}
					]

				},
				btnDisabled: false
			}
		},
		methods: {
			// 隐藏眼睛
			hideEye(type) {
				this.showEye = type
			},
			// 切换类型
			changeType() {
				this.loginType = this.loginType === '1' ? '2' : '1'
				this.form.password = ''
				this.form.userName = ''
				this.$refs.uForm.clearValidate()
			},
			// 验证码改变
			codeChange(text) {
				this.tips = text
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在发送验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送')
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start()
					}, 2000)
				} else {
					uni.$u.toast('请倒计时结束后再发送')
				}
			},
			// 提交登录
			submit() {
				let token = uni.getStorageSync("token")
				console.log(token);
				if(token !== null && token !== ''){
					console.log("重复登录");
					uni.showToast({
						title:"禁止重复登录",
						mask:true,
						icon:'error',
						success() {
							setTimeout(() => {
								uni.redirectTo({
									url:"/pages/news/news"
								})
							},500)
						}
					})
				}else{
					console.log("登录");
					this.$refs.uForm.validate().then(res => {
						
						uni.showLoading({
							title: "登录中",
							mask: true
						})
						this.btnDisabled = true
						let form = JSON.parse(JSON.stringify(this.form))
						form.password = this.encryptKey(form.password);
						uni.removeStorageSync("token")
						//登录逻辑，需要限制用户的请求频率
						var _this = this
						setTimeout(() => {
							login(form).then((result) => {
								let data = result.data;
								console.log("登录的回调：",data);
								console.log("登录后本地的token：", uni.getStorageSync("token"));
								uni.showToast({
									title:data.message,
									icon:'success',
									mask:true,
									success() {
										setTimeout(() =>{
											uni.redirectTo({
												url:'/pages/news/news'
											})
										},800)
									}
								})
							}).catch(e => {
								console.log(e);
								uni.showToast({
									title: e.data.message !== "" ? e.data.message : "登录失败",
									icon: 'error',
									success() {
										_this.form.password = ''
									}
								})
							})
						}, 500)
						this.btnDisabled = false
					}).catch(errors => {
						uni.$u.toast('请检查账号或密码')
						console.log(errors);
					})
				}
				

			},
			//节流函数
			throttle: throttle((form) => {
				console.log("点击了2");
				console.log(form);

			}, 500),
			//加密密码
			encryptKey(password) {
				var encryptor = new JSEncrypt()
				let publicKey = getPublicKey()
				encryptor.setPublicKey(publicKey)
				let rsaPassword = encryptor.encrypt(password)
				return rsaPassword
			},
			// 注册
			signIn() {
				this.$refs.uForm.validate().then(res => {
					uni.showLoading({
						mask: true,
						title: "注册中..."
					})
					setTimeout(() => {
						let form = JSON.parse(JSON.stringify(this.form))
						form.password = this.encryptKey(form.password)
						console.log(form);
						register(form).then(res => {
							console.log(res);
							let icon = res.code === 200 ? 'success' : 'error'
							uni.showToast({
								mask:true,
								icon:icon,
								title:res.message
							})
							if (res.code === 200) {
								this.loginType = '1'
								this.form.password = ''
								this.form.userName = ''
							}
						}).catch(e => {
							uni.showToast({
								title:res.message,
								mask:true
							})
						})
					}, 500)
				}).catch(errors => {
					uni.$u.toast('请检查账号或密码')
				})
			},
			//加密

		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding-top: 150rpx;

		.login-form {}

	}
</style>