import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from "vuex-persistedstate"
// import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        // getters
    },
    plugins: [
        createPersistedState({
            // storage:window.sessionStorage,
            reducer(val) {
                return {
                    user: {
                        defaultTheme: val.user.defaultTheme
                    }
                }
            }
        })
    ]
})

export default store;