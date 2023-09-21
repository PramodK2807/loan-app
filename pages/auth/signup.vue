<template>
  <div class="background">
    <div class="container">
      <div
        class="row d-flex align-items-center justify-content-center min-vh-100"
      >
        <div class="col-md-6 col-lg-5">
          <form @submit.prevent="signuUpLogic">
            <h1 class="text-center pb-4">Register Form</h1>
            <div class="input_container my-2">
              <input
                type="text"
                placeholder="Enter Full Name"
                pattern="[a-zA-Z]*"
                v-model="form.name"
                class="px-3 py-2 input"
              />
            </div>
            <div class="input_container my-2">
              <input
                type="text"
                placeholder="Email"
                v-model="form.email"
                class="px-3 py-2 input"
              />
            </div>
            <div class="input_container my-2">
              <input
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder="Password"
                v-model="form.password"
                class="px-3 py-2 input"
              />
              <div
                class="eye_container"
                @click.prevent="isPasswordVisible = !isPasswordVisible"
              >
                <img
                  v-if="isPasswordVisible"
                  src="~/assets/images/hide.png"
                  alt="eye"
                  class="eye"
                />
                <img
                  v-else
                  src="~/assets/images/view.png"
                  alt="eye"
                  class="eye"
                />
              </div>
            </div>
            <div class="input_container my-2">
              <input
                :type="isCPasswordVisible ? 'text' : 'password'"
                placeholder="Confirm Password"
                v-model="form.confirmPassword"
                class="px-3 py-2 input"
              />
              <div
                class="eye_container"
                @click.prevent="isCPasswordVisible = !isCPasswordVisible"
              >
                <img
                  v-if="isCPasswordVisible"
                  src="~/assets/images/hide.png"
                  alt="eye"
                  class="eye"
                />
                <img
                  v-else
                  src="~/assets/images/view.png"
                  alt="eye"
                  class="eye"
                />
              </div>
            </div>
            <div class="ml-1 agreement">
              <input type="checkbox" v-model="form.agreement" /> I accept the
              <NuxtLink to="/tNc">terms & conditions</NuxtLink>
            </div>
            <div class="text-center mt-5">
              <button
                type="submit"
                class="auth_btn rounded-pill text-center py-2 w-50"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: "authLayout",

  data: () => ({
    form: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    },
    isPasswordVisible: false,
    isCPasswordVisible: false,
  }),

  methods: {
    ...mapActions("auth", ["register"]),

    async signuUpLogic() {
      const errorAlerts = [];
      if (!this.form.name) {
        errorAlerts.push("Full Name");
      }
      if (!this.form.email) {
        errorAlerts.push("Email");
      }
      if (!this.form.password) {
        errorAlerts.push("Password");
      }
      if (!this.form.confirmPassword) {
        errorAlerts.push("Confirm Password");
      }
      if (!this.form.agreement) {
        errorAlerts.push("Agreement");
      }
      if (errorAlerts.length > 0) {
        this.$swal.fire(`All fields are required: ${errorAlerts.join(", ")}`);
        return false;
      }
      let res = await this.register(this.form)
      // console.log(res)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/auth.scss";
.background {
  width: 100%;
  height: 100vh;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
}
</style>
