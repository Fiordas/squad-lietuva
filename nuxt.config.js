const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  router: {
    linkActiveClass: 'is-active'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    {
      src: '~assets/css/main.scss',
      lang: 'scss'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios', '~/plugins/firestore-map', '~/plugins/firestore-parser'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    'nuxt-i18n'
  ],
  buefy: {
    css: false
  },
  i18n: {
    locales: [
      {
        name: 'Lietuvių',
        code: 'lt',
        iso: 'lt',
        file: 'lt-LT.js'
      },
      {
        name: 'English',
        code: 'en',
        iso: 'us',
        file: 'en-US.js'
      }
    ],
    defaultLocale: 'lt',
    langDir: 'locales/',
    lazy: true
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
