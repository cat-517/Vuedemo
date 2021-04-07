import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
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
                sessionStorage.setItem('user', JSON.stringify(payload))
            } else {
                sessionStorage.removeItem('user')
            }

        }
    },
    actions: {
        changeUserAction({ commit }, payload) {
            commit('CHANGE_USERINFO', payload)
        }
    }
})
