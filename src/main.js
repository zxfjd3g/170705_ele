import Vue from 'vue'
import App from './App'
import router from './router'

import './common/stylus/fonts.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
