export default {
    getToken (state) {
        return state.token;
    },
    getLoged (state) {
        return state.loged;
    },
    getError(state) {
        return state.error;
    },
    getErrorMessage(state) {
        return state.errorMessage;
    }
}