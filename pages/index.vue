<template>
  <div>
    <div>
      <HomeFeature />
    </div>

    <div class="my-5">
      <HomeSteps />
    </div>

    <!-- <div class="text-center login_button py-3">
      <button class="rounded-pill">
        <NuxtLink to="/auth/login" class="px-5 py-2 text-dark">Login</NuxtLink>
      </button>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["user", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["initializeLocal"]),
  },
  async mounted() {
    // if (!this.user) {
    //   this.$router.push("/auth/login");
    // }

    let res = await this.initializeLocal();
  },
};
</script>

<style scoped>
button {
  font-size: 25px;
  font-weight: bold;
}

.login_button {
  background: lightgrey;
}
</style>
