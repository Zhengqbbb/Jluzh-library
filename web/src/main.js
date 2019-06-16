import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入scss,npm i -D sass sass-loader
import './assets/scss/style.scss'
import './assets/icons/iconfont.css'

//Vue-Awesome-Swiper组件
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Card from './components/card.vue'
Vue.component('m-card',Card)
//axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
