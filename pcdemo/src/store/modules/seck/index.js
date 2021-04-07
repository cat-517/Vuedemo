import { seckList } from '@/utils/axios'

const state = {
    secklist: []
}

const getters = {
    getSeckList(state) {
        return state.secklist
    }
}

const mutations = {
    REQ_SECKLIST(state, payload) {
        state.secklist = payload
    }
}

const actions = {
    getSeckListAction({ commit }) {
        seckList()
            .then(res => {
                if (res.data.code == 200) {
                    commit('REQ_SECKLIST', res.data.list)
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