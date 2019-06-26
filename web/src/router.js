import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Book from './views/book/Book.vue'
import BookInfor from './views/book/BookInfor.vue'
import New from './views/ad/New.vue'
import NewInfor from './views/ad/NewInfor.vue'
import Server from './views/ad/Server.vue'
import ServerInfor from './views/ad/ServerInfor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path: '/',name:'home',component:Home},
        {path: '/book',name:'book',component:Book},
        {path: '/book/infor/:id',name:'bookinfor',component:BookInfor,props: true},
        {path: '/new',name:'new',component:New},
        {path: '/new/infor/:id',name:'newinfor',component:NewInfor,props: true},
        {path: '/server',name:'server',component:Server,
          children:[{path: '/server/infor/',name:'serverinfor',component:ServerInfor}]
        },
        
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
