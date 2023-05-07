/**
 * 节流函数
 */
//形参中的 fn ，是指自己根据需求写的方法
//delay , 是打算多久执行一次方法的时间
export const throttle = (fn,delay) => {
	//进入的时间，其实就是用户什么时候 触发 的 滚动条
	var enterTime = 0; 
	var gapTime = delay || 200; //间隔时间
	return function(){
		var context = this;
		//第一次 执行 return 里面的匿名函数方法的时间
		var backTime = new Date(); 
		// 用户 触发 到 执行是需要时间的，因此 如果 执行匿名函数方法的时间 减去 出发的时间 大于间隔的时间，就进行函数的触发；
		if(backTime - enterTime > gapTime){ 
			fn.apply(context,arguments);
			//把执行匿名函数方法的时间保存 到 触发的时间，以便 第二次运行函数
			enterTime = backTime 
		}
	}
}
