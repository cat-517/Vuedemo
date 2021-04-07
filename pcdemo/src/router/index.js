import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 用来控制局部权限
function hasUrl(url) {
  return store.getters.getUserInfo.some(item => item == url)
}

Vue.use(Router)

export const indexRouters = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: '菜单管理',
    beforeEnter(to, from, next) {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    name: '角色管理',
    beforeEnter(to, from, next) {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path: '/manage',
    component: () => import('@/views/manage/manage'),
    name: '管理员管理',
    beforeEnter(to, from, next) {
      hasUrl('/manage') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('@/views/goodscate/cate'),
    name: '商品分类'
  },
  {
    path: '/specs',
    component: () => import('@/views/goodsspecs/specs'),
    name: '商品规格'
  },
  {
    path: '/goods',
    component: () => import('@/views/goods/goods'),
    name: '商品管理'
  },
  {
    path: '/member',
    component: () => import('@/views/member/member'),
    name: '会员管理'
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/banner'),
    name: '轮播图管理'
  },
  {
    path: '/seck',
    component: () => import('@/views/seck/seck'),
    name: '限时秒杀'
  },
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home')
        },
        ...indexRouters,
        {
          path: '',
          redirect: '/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

// 全局导航守卫之登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
    return
  }

  // let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}

  // if (userInfo) {
  if (store.getters.getUserInfo) {
    next()
    return
  }
  next('/login')
})

export default router

