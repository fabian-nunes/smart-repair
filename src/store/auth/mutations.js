export default {
    setToken(state, payload) {
        state.token = payload.token;
        state.loged = true;
    }
}