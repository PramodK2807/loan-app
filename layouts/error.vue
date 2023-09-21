<template>
  <div class="container px-4 text-center">
    <div>
      <h1 v-if="error.statusCode === 404" class="mt-5 mb-4 font_size_36">404 Page Not Found</h1>
      <h1 v-else class="mt-5 mb-4 font_size_36">Error</h1>
      <NuxtLink to="/" class="btn btn-secondary border border-dark border-2"> Home page </NuxtLink>
    </div>
  </div>
</template>

<script>

export default {
  props: ['error'],
  layout: 'error',
};
</script>
