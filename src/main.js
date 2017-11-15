import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import VueScroller from 'vue-scroller'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import loading from './common/imgs/loading.gif'

import './filters'
import './mock/mockServer'
import './common/stylus/fonts.styl'

Vue.use(VueResource)
Vue.use(VueLazyload, {
  loading
}) // 内部会自定义一个全局指令 lazy来实现图片懒加载
Vue.use(VueScroller)  // 多了一个组件标签<scroller>

// 将组件映射成全局标签
Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
