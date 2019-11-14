import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'amfe-flexible/index.js'
import { Button } from 'vant'

Vue.config.productionTip = false
Vue.use(Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
