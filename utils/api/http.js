import config from '@/utils/lib/config.js'
import {
	login
} from './user'
let baseUrl = config.baseUrl
//请求方法
export const request = (options) => {
	let t = uni.getStorageSync("token")
	console.log("token:",t);
	if(t !== null || t !== ""){
		uni.request({
			url:baseUrl + '/user/reflashToken',
			method:'POST',
			header: {
				token: t, //从Storage中获取保存的token
			},
			success: (res) => {
				if(res.statusCode === 200){
					let data = res.data
					if(data.data != null){
						let token = data.data
						uni.setStorageSync("token",token)
					}
				}
			}
		})
	}
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url, //接口地址：前缀+方法中传入的地址
			method: options.method || 'GET', //请求方法：传入的方法或者默认是“GET”
			header: {
				token: uni.getStorageSync("token"), //从Storage中获取保存的token
			},
			data: options.data || {}, //传递参数：传入的参数或者默认传递空集合
			// headers: {
			//     'Authorization ': window.localStorage.getItem('token') //自定义请求头信息
			// },
			success: (res) => {
				//返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				// if (res.data.success != true) {
				// 	return uni.showToast({
				// 		title: '获取数据失败',
				// 		icon: 'none'
				// 	})
				// }
				// 如果不满足上述判断就输出数据
				if (res.statusCode === 200 && res.data.code === 200) {
					let data = res.data
					if(data.hasOwnProperty("data")){
						if (data.data.hasOwnProperty("token")) {
							let token = data.data.token;
							console.log("token " + token);
							//将token存储到Storage中
							uni.setStorageSync("token", token);
						}
					}
					
					resolve(res.data);
				} else if (res.statusCode === 403 || res.statusCode === 401) {
					uni.showToast({
						title: "请登录",
						mask: true,
						icon: 'error',
						duration: 2000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/mine/login',
							animationDuration: 500,
							animationType: 'slide-in-right'
						})
					}, 2000)
					reject(res);
				}else{
					reject(res)
				}
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}

