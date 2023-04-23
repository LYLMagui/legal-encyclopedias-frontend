import {request} from './http.js'
/**
 * 获取法律列表
 * @param {Object} param 
 */
export function queryLawList(param){
	return request({
		url:'/legal/queryLawList',
		method:'POST',
		data:param
	})
}
/**
 * 获取法律一级分类
 */
export function queryLawType(){
	return request({
		url:'/legal/queryLawType',
		method:'GET'
	})
}
/**
 * 获取法律二级分类
 * @param {Object} secType 二级分类编码
 */
export function querySecType(secType){
	return request({
		url:'/legal/querySecType/' + secType ,
		method:'GET'
	})
}
/**
 * 根据内容获取法律
 * @param {Object} param
 */
export function queryLawsByArticle(param){
	return request({
		url:'/legal/queryLawsByArticle',
		method:'POST',
		data:param
	})
}


