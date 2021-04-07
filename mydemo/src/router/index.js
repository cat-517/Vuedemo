import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入一级目录
import Home from '@/pages/home';
import WxLogin from '@/pages/wxLogin'
import SjLogin from '@/pages/sjLogin'
import Detail from '@/pages/detail'

// 引入二级目录
import Index from '@/views/index';
import Cart from '@/views/cart';
import Sort from '@/views/sort';
import Mine from '@/views/mine';

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/index',
          component: Index,
          name: '小U商城'
        },
        {
          path: '/cart',
          component: Cart,
        },
        {
          path: '/sort',
          component: Sort,
          name: '分类'
        },
        {
          path: '/mine',
          component: Mine
        },
        {
          path: '',
          redirect: '/index'
        }
      ]
    },
    {
      path: '/wxLogin',
      component: WxLogin
    },
    {
      path: '/sjLogin',
      component: SjLogin
    },
    {
      path: '/detail',
      component: Detail,
      name: '商品详情'
    },
    {
      path: '/shopList',
      component: () => import('@/pages/shopList'),
      name: '商品列表'
    },
    {
      path: '/order',
      component: () => import('@/pages/order')
    },
    {
      path: '/register',
      component: () => import('@/pages/register')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
