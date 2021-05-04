export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - crm',
    title: 'crm',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase'
  ],

  // Firebase module configuration: https://firebase.nuxtjs.org/guide/getting-started#configure
  firebase: {
    config: {
      apiKey: "AIzaSyBNQMk7T_R6LeqymJ-qngERgZLXylGpXjc",
      authDomain: "phlbtcrm.firebaseapp.com",
      projectId: "phlbtcrm",
      storageBucket: "phlbtcrm.appspot.com",
      messagingSenderId: "757805963197",
      appId: "1:757805963197:web:f0e014679ede5acfafe4d4",
      measurementId: "G-FERZSZ55EM"
    },
    services: {
      auth: {
        persistence: 'session', // default
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
        },
        ssr: false,
      },
      firestore: true
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js'
  },

  router: {
    middleware: [
      'auth'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
