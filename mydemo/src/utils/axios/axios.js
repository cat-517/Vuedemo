// 引入axios库
import axios from 'axios'
import store from '../../store'

let http = axios.create({
    baseURL: '/api'
})

// axios拦截器

// 请求拦截 用处：设置请求头  操作的是network中的request
http.interceptors.request.use(req => {
    // 购物车添加请求头
    if (store.getters.getUserInfo) {
        req.headers.authorization = store.getters.getUserInfo.token
    }
    return req
})


// 响应拦截 操作：1、对返回的进行修改 不用进行全局返回 2、会全局错误拦截
http.interceptors.response.use(res => {
    return res.data
})


// 导出
export default http