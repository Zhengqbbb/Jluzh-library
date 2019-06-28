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

//自封装分类卡片组件
import CategoryCard from './components/CategoryCard.vue'
Vue.component('qb-list',CategoryCard)
//自封装图书卡片组件
import BookCard from './components/BookCard.vue'
Vue.component('qb-book',BookCard)




//axios
import axios from 'axios'

import './plugins/element.js'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
