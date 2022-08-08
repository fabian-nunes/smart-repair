import authGetters from './getters'
import authMutations from './mutations'
import authActions from './actions'

export default {
    namespaced: true,
    state: {
        token: '',
        loged: false,
        error: false,
        errorText: '',
    },
    mutations: authMutations,
    getters: authGetters,
    actions: authActions,
}