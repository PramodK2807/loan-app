import authMutations from "./mutations";
import authAction from "./actions";

const state = () => ({
  totalLoanDetails: [],
  totalLoanAmount: null,
  installmentTerms: null,
  requestDate: null,
  scheduledRepayments: null,
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
