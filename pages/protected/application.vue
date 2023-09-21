<template>
  <div class="container my-5">
    <h2 class="text-center green_text">
      Apply for the loan, fill the form correctly
    </h2>
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <form @submit.prevent="requestForLoan">
          <div class="form-group my-4">
            <input
              type="text"
              v-model="loan.amount"
              placeholder="Enter the loan Amount"
              class="form-control-input py-2 px-3"
              id="amount1"
            />
            <label for="amount1" class="px-3">Amount</label>
          </div>
          <div class="form-group my-4">
            <input
              type="text"
              placeholder=""
              v-model="loan.term"
              class="form-control-input py-2 px-3"
              id="instTerms"
            />
            <label for="instTerms" class="px-3">No. of Installement</label>
          </div>
          <div class="text-center">
            <button type="submit" class="w-50 rounded-pill py-2 fw-bold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware: ["authenticated"],
  data: () => ({
    loan: {
      amount: "",
      term: 3,
      userId: null,
    },
  }),
  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
  },
  async mounted() {
    if (this.user) {
      this.loan.userId = this.user._id;
    }
    
  },
  methods: {
    ...mapActions("user", ["applyForLoan"]),

    async requestForLoan() {
      if (this.user.role == "admin") {
        this.$swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Admin can not request for loan",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
        });

        return false;
      }
      const res = await this.applyForLoan(this.loan);
    },
  },
};
</script>

<style>
.form-group {
  position: relative;
}

input.form-control-input {
  border: 1px solid #0b8c4c;
  border-radius: 8px;
  width: 100%;
  transition: all 0.3s;
}

input.form-control-input:focus {
  border-bottom: 1px solid #0b8c4c;
}

label {
  position: absolute;
  top: 50%;
  transform: translate(-0%, -50%);
  left: 10px;
  transition: all 0.3s;
  pointer-events: none;
  display: none;
}

input.form-control-input:focus + label,
input.form-control-input:not(:placeholder-shown) + label {
  display: block;
  top: -2px;
  color: #0b8c4c;
  font-weight: bold;
  background: rgb(255, 255, 255);
}
button {
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  border: solid 2px rgb(10, 190, 214);
  background-color: #cccccc;
  transition: all 0.5s;
  position: relative;
  left: 0;
  transform: translateY(0);
}
button:hover {
  background-color: rgb(10, 190, 214);
  border: solid 2px #cccccc;
  transform: translateY(1px);
}
</style>
