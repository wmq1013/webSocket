import Vue from 'vue'
import App from './App.vue'
import router from './router'
// WebSocket封装方法
import * as socketApi from '@/utils/websocket'
Vue.prototype.$socketApi = socketApi

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
