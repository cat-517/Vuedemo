// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

import './assets/css/reset.css'
import './assets/font/iconfont.css'
import './assets/css/public.css'

// 引入样式
// import './assets/css/detail.css'

// 引入格式化js文件
import './assets/js/rem.js'

Vue.config.productionTip = false

// 引入vant
import VantUI from 'vant'
Vue.use(VantUI)

// 图片服务器
Vue.prototype.$img = 'http://localhost:3000'

import comFilter from './filters'
for (let i in comFilter) {
  Vue.filter(i, comFilter[i])
}

import 'vant/lib/index.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
