import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'
Vue.config.productionTip = false

import http from './http.js'
Vue.prototype.$http = http


/**
 * 全局实例添加方法保证文件上传成功
 * 上传文件的时候保证带有localStorage
 */
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL+ 'upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return{
        Authorization: `Bearer ${localStorage.token ||''}`
      }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
