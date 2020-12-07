const state = {
    defaultTheme: 'default' 
}
const mutations = {
    setTheme(state, val) {
        state.defaultTheme = val;
    }
}

export default {namespaced: true, state, mutations}
