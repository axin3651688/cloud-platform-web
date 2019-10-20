// ie polyfill
import '@babel/polyfill'
import qs from 'qs';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Antd from 'ant-design-vue'
import {
  VueAxios
} from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false
Vue.prototype.$qs = qs;

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(Antd)

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')