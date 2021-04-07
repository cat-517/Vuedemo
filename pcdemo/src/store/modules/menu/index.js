// 引入封装好的接口
import { getMenuList } from '../../../utils/axios'

const state = {
    menuList: []
}

const getters = {
    getMenuList(state) {
        return state.menuList
    }
}

const mutations = {
    GET_MENULIST(state, payload) {
        state.menuList = payload
    }
}

const actions = {
    // 获取行动
    getMenuListAction({ commit }) {
        // getMenuList({ istree: true }).
        getMenuList().
            then((res) => {
                // console.log(res);
                if (res.data.code == 200) {
                    commit('GET_MENULIST', res.data.list)
                }
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}