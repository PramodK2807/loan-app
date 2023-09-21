import authMutations from "./mutations";
import authAction from "./actions";

const state = () => ({
  isAuthenticated: false,
  user: null,
  role: null,
  token: null,
});

const getters = {};

const actions = {
  ...authAction,
};

const mutations = {
  ...authMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
