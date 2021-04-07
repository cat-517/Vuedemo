/*
 * 编写index.js文件 方便引入查找
 */
import http from './axios'

// 获取首页轮播图
export function getBanner() {
    return http.get('/api/getbanner')
}

// 首页商品列表
export function indexGoods() {
    return http.get('/api/getindexgoods')
}

// 分类树形结构
export function getCateTree() {
    return http.get('/api/getcatetree')
}

// 获取分类商品
export function getGoods(params) {
    return http.get('/api/getgoods', {
        params
    })
}

// 获取商品详情
export function goodsInfo(params) {
    return http.get('/api/getgoodsinfo', {
        params
    })
}

// 注册
export function registerInfo(data) {
    return http.post('/api/register', data)
}

// 登录
export function loginInfo(data) {
    return http.post('/api/login', data)
}

// 购物车列表
export function cartList(params) {
    return http.get('/api/cartlist', {
        params
    })
}

// 购物车添加
export function addCart(data) {
    return http.post('/api/cartadd', data)
}

// 购物车删除
export function deleteCart(data) {
    return http.post('/api/cartdelete', data)
}

// 秒杀
export function getSeck() {
    return http.get('/api/getseckill')
}