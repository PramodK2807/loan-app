<template>
  <nav class="navbar navbar-expand-md navbar-light bg-dark">
    <div class="container">
      <NuxtLink to="/" class="nav_logo">SIMPLOAN</NuxtLink>
      <button
        class="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link text-light" to="/protected/application"
              >Apply For Loan</NuxtLink
            >
          </li>
          <li v-if="isAuthenticated">
            <NuxtLink
              :to="
                role === 'user'
                  ? '/user/dashboard'
                  : '/protected/admin/dashboard'
              "
              >{{ role === "user" ? "Profile" : "Admin Dashboard" }}</NuxtLink
            >
          </li>

          <li v-if="isAuthenticated">
            <button
              @click.prevent="userLogout"
              class="rounded-pill border border-warning px-3 py-1"
            >
              Logout
            </button>
          </li>

          <li v-else>
            <NuxtLink to="/auth/login">Login</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isAuthenticated: false,
      role: "",
    };
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    async userLogout() {
      let res = await this.logout();
      this.$router.push("/auth/login");
    },
  },

  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.isAuthenticated = true;
      this.role = user.role;
    }
  },
};
</script>

<style scoped>
button {
  transform: translate(0) !important;
}
button:hover {
  transform: translate(0) !important;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
