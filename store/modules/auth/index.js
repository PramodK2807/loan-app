import authMutations from "./mutations";
import userMutations from "../user/mutations";
import authAction from "./actions";
import userAction from "../user/actions";


const state = () => ({
  isAuthenticated: false,
  user: null,
  role: null,
  token: null,
});

const getters = {};

const actions = {
  ...authAction,
  ...userAction,
};

const mutations = {
  ...authMutations,
  ...userMutations,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
