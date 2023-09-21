export default {
  setTotalLoanAmount(state, amount) {
    state.totalLoanAmount = amount;
  },
  setLoanDetails(state, loanDetails) {
    state.totalLoanDetails = loanDetails;
  },
  setRequestDate(state, date) {
    state.requestDate = date;
  },
  setScheduledRepayments(state, scheduledRepayments) {
    state.scheduledRepayments = scheduledRepayments;
  },
};
