import Vue from 'vue'
import {
  Button,
  NavBar,
  Toast,
  Icon,
  Tag
} from 'vant'

Toast.setDefaultOptions('loading', { forbidClick: true, duration: 0 })

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Tag)
