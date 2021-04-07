import { specsList, specsCount } from '@/utils/axios'
const state = {
    specsList: [],
    size: 2,
    page: 1,
    count: 0
}

const getters = {
    getSpecsList(state) {
        return state.specsList
    },
    getCount(state) {
        return state.count
    },
    getSize(state) {
        return state.size
    }
}

const mutations = {
    GET_SPECSLIST(state, payload) {
        state.specsList = payload
    },
    GET_GOUNT(state, payload) {
        state.count = payload
    },
    CHANGE_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    getSpecsListAction(context) {
        specsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code == 200) {
                    context.commit('GET_SPECSLIST', res.data.list)
                    // let list = res.data.list ? res.data.list : []
                    // 
                    if (context.state.page != 1 && res.data.list.length == 0) {
                        // 修改page的行动  传递page-1
                        context.dispatch('changePageAction', context.state.page - 1)
                    }
                }
            })
    },
    // 获取总数的行动
    getCountAction({ commit }) {
        specsCount()
            .then(res => {
                if (res.data.code == 200) {
                    commit('GET_GOUNT', res.data.list[0].total)
                }
            })
    },
    // 切换页码的行动
    changePageAction(context, payload) {
        // 修改page
        context.commit('CHANGE_PAGE', payload)
        // 从新调取列表 
        context.dispatch('getSpecsListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}