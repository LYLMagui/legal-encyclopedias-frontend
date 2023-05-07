import {request} from './http.js'

/**
 * 获取法律书库列表
 * @param {Object} params
 */
export function queryLib(params){
	return request({
		url:'/lib/queryLib',
		method:'POST',
		data:params
	})
}