// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入仓库
import store from './store'

// 引入elemenr-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 引入重置样式
import './assets/css/reset.css'

// 引入全局组件模块
import elBread from './common'
for (let i in elBread) {
  Vue.component(i, elBread[i])
}

// 创建一个全局服务器变量
Vue.prototype.$imgUrl = 'http://localhost:3000'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
