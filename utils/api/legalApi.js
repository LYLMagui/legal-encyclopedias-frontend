import {request} from './http.js'
/**
 * 获取法律列表
 * @param {Object} params
 */
export function queryLawList(params){
	return request({
		url:'/legal/queryLawList',
		method:'POST',
		data:params
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
 * @param {Object} params
 */
export function queryLawsByArticle(params){
	return request({
		url:'/legal/queryLawsByArticle',
		method:'POST',
		data:params
	})
}
/**
 * 获取法律正文
 * @param {Object} param
 */
export function queryLegalContent(params){
	return request({
		url:'/legal/queryLegalContent',
		method:'POST',
		data:params
	})
}

/**
 * 获取最新法律列表
 */
export function queryLastLaws(){
	return request({
		url:'/legal/queryLastLaws',
		method:'GET'
	})
}


