import Vue from 'vue'
import App from './App.vue'
import router from './router'
<%_ if (options.vuex) { _%>
import store from './store'
<%_ } _%>
import 'normalize.css'
import 'amfe-flexible/index.js'
<%_ if (options.vant) { _%>
import './plugins/vant.js'
<%_ } _%>
<%_ if (options.svgIcon) { _%>
import './icon'
<%_ } _%>

Vue.config.productionTip = false

new Vue({
  router,
  <%_ if (options.vuex) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
}).$mount('#app')
