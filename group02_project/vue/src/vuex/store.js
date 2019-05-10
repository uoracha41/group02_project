import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    Username:'',
    Status: false,
    Permission: false,
}

const mutations = {

    addUsername: (state, n) => {
        state.Username = n
    },
    addStatus: (state, n) => {
        state.status = n
    },
    addPermission: (state, n) => {
        state.permission = n
    }
}

const getters = {
    Username: state => state.Username,
    Status: state => state.Status,
    Permission: state => state.Permission
}

const actions = {
    addUsernameVal: (state, n) => {
        store.commit('addUsername', n)
    },
    addStatusVal: (state, n) => {
        store.commit('addStatus', n)
    },
    addPermissionVal: (state, n) => {
        store.commit('addPermission', n)
    }
}

let store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [
        createPersistedState()
    ]
})

global.store = store
export default store