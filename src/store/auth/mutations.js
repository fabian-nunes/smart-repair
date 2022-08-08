export default {
    setToken(state, payload) {
        state.token = payload.token;
        state.loged = true;
    },
    setError(state, payload) {
        state.error = payload.error;
        state.errorMessage = payload.errorMessage;
    }
}