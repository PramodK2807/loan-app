<template>
  <nav>
    <div
      class="container d-flex align-items-center justify-content-between py-2"
    >
      <div>
        <NuxtLink to="/" class="text-dark nav_logo"> SIMPLOAN </NuxtLink>
      </div>
      <div class="d-flex align-items-center justify-content-center gap">
        <div>
          <button
            class="rounded-pill py-0 py-sm-2 px-2 px-sm-4"
            :class="$route.path === '/auth/login' && 'active-button'"
          >
            <NuxtLink to="/auth/login" class="text-dark">Login</NuxtLink>
          </button>
        </div>
        <div>
          <button
            class="rounded-pill py-0 py-sm-2 px-2 px-sm-4 text-nowrap"
            :class="$route.path === '/auth/signup' && 'active-button'"
          >
            <NuxtLink to="/auth/signup" class="text-dark">Sign Up</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style scoped lang="scss">
@import "~/assets/styles/bootstrapBreakpoint.scss";

nav {
  background: linear-gradient(to right, #dee2fb, #fafafa);
}
.nav_logo {
  font-weight: 800 !important;
}
.gap {
  gap: 10px;
}

button {
  border: none;
  outline: none;
  background: none;
}

button.active-button {
  background: #ebeff2;
  box-shadow: inset 4px 10px 9px #cbced1, inset 7px -10px 10px #fff;
  transition: all 0.3s;
}

button a {
  color: #5271ff;
  font-weight: bold;
  font-size: 12px;
}

button {
  transform: translate(0) !important;
}

button:hover {
  transform: translate(0) !important;
}

@include media-breakpoint-down(md) {
  .logo_with_name {
    object-fit: contain;
    width: 150px;
  }
}

@include media-breakpoint-between(md, lg) {
  .logo_with_name {
    width: 140px;
  }
}

@include media-breakpoint-up(sm) {
  .gap {
    gap: 20px;
  }
  button a {
    font-size: 16px;
  }
}
</style>
