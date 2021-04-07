// 引入接口
import { getRoleList } from '../../../utils/axios'

const state = {
    roleList: []
}

const getters = {
    getRoleList(state) {
        return state.roleList
    }
}

const mutations = {
    GETROLELIST(state, payload) {
        state.roleList = payload
    }
}

const actions = {
    getRoleListAction({ commit }) {
        getRoleList()
            .then(res => {
                commit('GETROLELIST', res.data.list)
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