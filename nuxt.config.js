require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "loan",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: "~/assets/styles/global.css" },
    { src: "~/assets/styles/myBootstrap.scss" },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/date-format.js", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "vue-sweetalert2/nuxt",
    ["@nuxtjs/dotenv", { filename: `.env.${process.env.NODE_ENV}` }],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
