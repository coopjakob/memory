const webpack = require('webpack')

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]
  }
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/bus.js',
    '~plugins/filters.js',
    { src: '~/plugins/config.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration

    analyze: true,
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
      )
    },
    filenames: {
      app: '[name].js',
      chunk: '[name].js',
      css: '[name].css',
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'async',
      }
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      layouts: false
    },
  }
}
