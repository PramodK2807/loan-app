<template>
  <div class="container">
    <div class="my-5">
      <div>
        <h1 class="text-center">Admin Dashboard</h1>
      </div>
      <h2 class="text-center my-5 text-success">
        You have {{ totalLoanDetails.length }} Loans
      </h2>
      <div class="row my-5">
        <div class="col-md-12 overflow-auto">
          <table class="table table-striped">
            <thead>
              <tr class="text-nowrap">
                <th scope="col">User ID</th>
                <th scope="col">Request Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Admin State</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody v-for="(details, i) in totalLoanDetails" :key="i">
              <tr
                :class="
                  details.adminState === 'APPROVED'
                    ? 'approved_clr'
                    : 'pending_clr'
                "
              >
                <th scope="row">{{ details.user }}</th>
                <td>{{ formatDate(details.createdAt) }}</td>
                <td>{{ details.amount }}</td>
                <td
                  :class="{
                    'text-danger': details.adminState !== 'APPROVED',
                    'text-success': details.adminState === 'APPROVED',
                  }"
                >
                  {{ details.adminState }}
                </td>
                <td>
                  <button
                    @click.prevent="approveByAdmin(details._id)"
                    :class="{
                      'bg-success text-light':
                        !details.adminState === 'APPROVED',
                      'bg-danger text-light': details.adminState === 'APPROVED',
                    }"
                    class="rounded-pill bg-success text-light px-4"
                  >
                    {{
                      details.adminState === "APPROVED" ? "Approved" : "Aprrove"
                    }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    userData: {
      userId: null,
    },
  }),
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
    ...mapActions("user", ["loanAmounts", "adminApprove", "fetchLoan"]),
    ...mapActions("auth", ["initializeLocal"]),

    async approveByAdmin(id) {
      let res = await this.adminApprove(id);
      console.log(res);
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
    if (this.user && this.isAuthenticated) {
      let loan = await this.fetchLoan();
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

      return false
    }
    let auth = await this.initializeLocal();
  },
};
</script>

<style scoped>
.approved_clr {
  background: linear-gradient(to right, rgb(192 255 192), rgb(243 255 232));
  color: black;
}
.pending_clr {
  background: linear-gradient(to right, rgb(147 147 147), rgb(248 255 169));
  color: white;
}
</style>
