export default {
  setUser(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setRole(state, role) {
    state.role = role;
  },

};
