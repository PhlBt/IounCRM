import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - crm',
    title: 'crm',
    htmlAttrs: {
      lang: 'en'
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
      apiKey: "AIzaSyAlRv8OqEja_pmg6cDFsSyVBSgjp3nkwl0",
      authDomain: "coffeecrm-11610.firebaseapp.com",
      projectId: "coffeecrm-11610",
      storageBucket: "coffeecrm-11610.appspot.com",
      messagingSenderId: "235769192918",
      appId: "1:235769192918:web:f891fc3883485fe2384477",
      measurementId: "G-1993VD94S1"
    },
    services: {
      auth: {
        persistence: 'session', // default
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChangedAction',
        },
        ssr: false,
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
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
/*
* Google reCaptcha
* site key
* 6LcOmU8aAAAAAJYPk9tY_fdowhH1YaCMmBB1HwQv
* secret key
* 6LcOmU8aAAAAAEyubUu1lsEwQMliS2m6aug6jELO
*/
