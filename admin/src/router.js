import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/book/CategoryEdit.vue'
import CategoryList from './views/book/CategoryList.vue'

import BookEdit from './views/book/BookEdit.vue'
import BookList from './views/book/BookList.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {path: '/book/categories/create',component: CategoryEdit},
        {path: '/book/categories/edit/:id',component: CategoryEdit,props: true},
        {path: '/book/categories/list',component: CategoryList},

        {path: '/book/create',component: BookEdit},
        {path: '/book/edit/:id',component: BookEdit,props: true},
        {path: '/book/list',component: BookList}
    ]
   },
]
})
