<template>
  <div class="container">
    <div class="my-5">
      <div>
        <h1 class="text-center">User Dashboard</h1>
      </div>
      <h2 class="text-center my-5 text-success">
        You have {{ totalLoanDetails.length }} Loans
      </h2>
      <div class="row my-5">
        <div
          class="col-lg-6 col-12 overflow-auto border border-md-warning"
          v-for="(loan, i) in totalLoanDetails"
          :key="i"
        >
          <div class="row">
            <div class="col-12 border-success text-center py-2 bg-warning">
              <h3>Loan Details</h3>
            </div>
            <div class="col-6 text-center py-3">
              <p>Loan Amount : {{ loan.amount }}</p>
            </div>
            <div
              class="col-6 text-center py-3"
              :class="loan.adminState === 'PENDING' ? 'red_bg' : 'green_bg'"
            >
              <p>Status by admin : {{ loan.adminState }}</p>
            </div>
            <div class="col-4 my-2">
              <p>Loan Terms : {{ loan.term }}</p>
            </div>
            <div class="col-4 my-2">
              <p>Loan Staus : {{ loan.state }}</p>
            </div>
            <div class="col-4 my-2">
              <p>Date : {{ formatDate(loan.createdAt) }}</p>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Repay Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody v-for="(repay, i) in loan.scheduledRepayments" :key="i">
                <tr>
                  <th scope="row">{{ i + 1 }}</th>
                  <td>{{ formatDate(repay.date) }}</td>
                  <td>{{ repay.amount }}</td>
                  <td
                    :class="{
                      'text-danger': repay.state !== 'PAID',
                      'text-success': repay.state === 'PAID',
                    }"
                  >
                    {{ repay.state }}
                  </td>
                  <td>
                    <button
                      :disabled="loan.adminState === 'PENDING'"
                      @click.prevent="installmentP(repay._id)"
                      :class="{
                        'bg-success text-light': !repay.state === 'PAID',
                        'bg-danger text-light': repay.state === 'PAID',
                      }"
                      class="rounded-pill bg-success text-light px-4"
                    >
                      {{ repay.state === "PAID" ? "Paid" : "Pay" }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  // data: () => ({
  //   userData: {
  //     userId: null,
  //   },
  // }),
  computed: {
    ...mapState("user", [
      "totalLoanDetails",
      "totalLoanAmount",
      "requestDate",
      "scheduledRepayments",
    ]),
    ...mapState("auth", ["user", "role", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("user", ["loanAmounts", "installmentPay"]),
    ...mapActions("auth", ["initializeLocal"]),

    async installmentP(id) {
      if ((!this.user && !this.role === "user") || !this.isAuthenticated) {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Please login First",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
        });

        return false;
      }
      let res = await this.installmentPay(id);
      // console.log(res);
    },

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    },
  },

  async mounted() {
    let auth = await this.initializeLocal(this.userData);
    if (this.user && this.isAuthenticated) {
      let res = await this.loanAmounts(this.user._id);
    } else {
      this.$swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please login First",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 5000,
      });

      return false;
    }
  },
};
</script>

<style scoped>
.red_bg {
  background: rgb(255 223 223);
  color: red;
}
.green_bg {
  background: rgb(205 255 205);
  color: green;
}
</style>
