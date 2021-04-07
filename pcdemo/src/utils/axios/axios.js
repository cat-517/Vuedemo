// 引入axios库
import axios from 'axios'
import router from '../../router'

let http = axios.create({
    baseURL: '/api'
})

// axios拦截器

// 请求拦截 用处：设置请求头  操作的是network中的request
http.interceptors.request.use(req => {
    let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token : ''
    // console.log(req);
    // 设置token请求头
    req.headers.authorization = token
    return req
})


// 响应拦截 操作：1、对返回的进行修改 不用进行全局返回 2、会全局错误拦截
http.interceptors.response.use(res => {
    // 在响应中会全局拦截错误
    // console.log(res);

    // token过期或失效  需进行全局拦截
    if(res.data.code == 403){
        router.push('/login')
    }
    return res
})


// 导出
export default http