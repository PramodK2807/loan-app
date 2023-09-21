<template>
  <div class="background">
    <div class="container">
      <div
        class="row d-flex align-items-center justify-content-center min-vh-100"
      >
        <div class="col-md-6 col-lg-4">
          <form @submit.prevent="loginLogic">
            <h1 class="text-center pb-4">Login Form</h1>
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
            <div class="text-center mt-5">
              <button
                type="submit"
                class="auth_btn rounded-pill text-center py-2 w-50"
              >
                Login
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
      email: "",
      password: "",
    },
    isPasswordVisible: false,
  }),

  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),

    async loginLogic() {
      const res = await this.login(this.form);
      if (this.isAuthenticated) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/auth.scss";
.background {
  width: 100%;
  height: 100vh;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
}
</style>
