import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

// 引入封装好的模块
import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seck from './modules/seck'

export default new Vuex.Store({
    state: { 
        // 用户信息 取出存储的值
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        CHANGE_USERINFO(state, payload) {
            if (payload) {
                state.userInfo = payload
                // 如果有参数 把参数存储到会话存储
                sessionStorage.setItem('userInfo', JSON.stringify(payload))
            } else {
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        // 修改用户信息的行动
        changeUserInfoAction({ commit }, payload) {
            commit('CHANGE_USERINFO', payload)
        }
    },
    modules: {
        menu,
        role,
        manage,
        cate,
        specs,
        goods,
        member,
        banner,
        seck
    }
})