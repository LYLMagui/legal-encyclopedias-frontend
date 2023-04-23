import App from './App'

// #ifndef VUE3
import Vue from 'vue'

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import navBar from "@/components/zhouWei-navBar/index.vue";
// import http from "@/utils/api/http.js"
// Vue.use(http)
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)



// uViewUI
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 引入配置文件
import $config from "@/utils/lib/config.js"
Vue.prototype.$config = $config
// 引入助手函数
import $tool from '@/utils/lib/tool.js'
Vue.prototype.$tool = $tool

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif