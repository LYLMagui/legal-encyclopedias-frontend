import {request} from './http.js'

/**
 * 用户登录
 * @param {Object} params
 */
export function login(params){
	return request({
		url:'/user/login/',
		method:'POST',
		data:params
	})
}

/**
 * 账号注册
 * @param {Object} params
 */
export function register(params){
	return request({
		url:'/user/register',
		method:'POST',
		data:params
	})
}
/**
 * 账号退出
 */
export function logout(){
	return request({
		url:'/user/logout',
		method:'GET'
	})
}