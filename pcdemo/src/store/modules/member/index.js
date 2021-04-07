// 引入封装好的接口
import { memberList } from '../../../utils/axios'

const state = {
    memberList: []
}

const getters = {
    getMemberList(state) {
        return state.memberList
    }
}

const mutations = {
    GET_MEMBERLIST(state, payload) {
        state.memberList = payload
    }
}

const actions = {
    // 获取行动
    getMemberListAction({ commit }) {
        // getMenuList({ istree: true }).
        memberList().
            then((res) => {
                if (res.data.code == 200) {
                    commit('GET_MEMBERLIST', res.data.list)
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