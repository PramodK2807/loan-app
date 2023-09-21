export default {
  // All loan details - fetching for admin to approve
  async fetchLoan({ commit }) {
    try {
      let result = await fetch(`${process.env.API}/loan/admin`, {
        method: "GET",
      });
      let res = await result.json();
      if (res.success) {
        commit("setLoanDetails", res.loan);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        });
        return true;
      } else {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });

        return false;
      }
    } catch (error) {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
  },

  async loanAmounts({ commit }, userData) {
    let id = userData;
    try {
      let result = await fetch(`${process.env.API}/loan/payments`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await result.json();
      if (res.success) {
        commit("setLoanDetails", res.loan);
        commit("setTotalLoanAmount", res.loan.amount);
        commit("setRequestDate", res.loan.createdAt);
        commit("setScheduledRepayments", res.loan.scheduledRepayments);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        });
        return true;
      } else {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });

        return false;
      }
    } catch (error) {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
  },

  async applyForLoan({ commit }, loanDetails) {
    const { amount, term, userId } = loanDetails;
    const user = userId;
    if (!user) {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Please Login First",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }

    try {
      const response = await fetch(`${process.env.API}/loan`, {
        method: "POST",
        body: JSON.stringify({ amount, term, user }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();

      const swalConfig = {
        toast: true,
        position: "top-end",
        title: res.message,
        showConfirmButton: false,
        timerProgressBar: true,
      };

      if (res.success) {
        this.$router.push("/user/dashboard");
        swalConfig.icon = "success";
        swalConfig.timer = 7000;
      } else {
        swalConfig.icon = "warning";
        swalConfig.timer = 3000;
      }

      this.$swal.fire(swalConfig);
      return res.success;
    } catch (error) {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
  },

  async installmentPay({ commit }, installmentId) {
    let id = installmentId;
    console.log(id);
    try {
      let result = await fetch(`http://localhost:3500/api/loan/repayments`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await result.json();
      console.log(res);
      if (res.success) {
        commit("setScheduledRepayments", res.repayment);
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `You have paid ₹${res.repayment.amount}`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
        });
        return true;
      } else {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });

        return false;
      }
    } catch (error) {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
  },

  async adminApprove({ commit }, loanId) {
    let id = loanId;
    console.log(id);
    try {
      let result = await fetch(`${process.env.API}/loan/admin`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      let res = await result.json();
      if (res.success) {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
        });
        return true;
      } else {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: res.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });

        return false;
      }
    } catch (error) {
      console.log(error);
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
  },
};
