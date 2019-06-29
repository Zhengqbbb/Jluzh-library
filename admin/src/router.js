import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Main from './views/Main.vue'
//分类
import CategoryEdit from './views/book/CategoryEdit.vue'
import CategoryList from './views/book/CategoryList.vue'
//图书
import BookEdit from './views/book/BookEdit.vue'
import BookList from './views/book/BookList.vue'
import BookAdd from './views/book/BookAdd.vue'
//读者
import ReaderAdd from './views/reader/ReaderAdd.vue'
import ReaderEdit from './views/reader/ReaderEdit.vue'
import ReaderList from './views/reader/ReaderList.vue'
import ReaderPass from './views/reader/ReaderPassword.vue'
import ReaderLend from './views/reader/ReaderLend.vue'
import ReaderReturn from './views/reader/ReaderReturn.vue'
//运营
import AdEdit from './views/ads/AdEdit'
import AdList from './views/ads/AdList'
import NewCategoryEdit from './views/ads/NewCategoryEdit'
import NewCategoryList from './views/ads/NewCategoryList'
import NewEdit from './views/ads/NewEdit'
import NewList from './views/ads/NewList'
import ServerEdit from './views/ads/ServerEdit'
import ServerList from './views/ads/ServerList'
//管理员
import AdminAdd from './views/admin/AdminAdd'
import AdminEdit from './views/admin/AdminEdit'
import AdminList from './views/admin/AdminList.vue'
import AdminPass from './views/admin/AdminPassword.vue'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{isPublic: true}
    },
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
        {path: '/book/list',component: BookList},
        {path: '/book/list/:bookname',component: BookList,props: true},
        {path: '/book/add/:id',component: BookAdd,props: true},
        
        {path: '/reader/create',component: ReaderAdd},
        {path: '/reader/edit/:id',component: ReaderEdit,props: true},
        {path: '/reader/list',component: ReaderList},
        {path: '/reader/password/:id',component: ReaderPass,props: true},
        {path: '/reader/lend/:id',component: ReaderLend,props: true},
        {path: '/reader/return/:id',component: ReaderReturn,props: true},

        {path: '/ads/create',component: AdEdit},
        {path: '/ads/edit/:id',component: AdEdit,props: true},
        {path: '/ads/list',component: AdList},
        {path: '/article_cat/create',component: NewCategoryEdit},
        {path: '/article_cat/edit/:id',component: NewCategoryEdit,props: true},
        {path: '/article_cat/list',component: NewCategoryList},
        {path: '/article/create',component: NewEdit},
        {path: '/article/edit/:id',component: NewEdit,props: true},
        {path: '/article/list',component: NewList},
        {path: '/server/create',component: ServerEdit},
        {path: '/server/edit/:id',component: ServerEdit,props: true},
        {path: '/server/list',component: ServerList},

        {path: '/admin_users/create',component: AdminAdd},
        {path: '/admin_users/edit/:id',component: AdminEdit,props: true},
        {path: '/admin_users/list',component: AdminList},
        {path: '/admin_users/password/:id',component: AdminPass,props: true},
    ]
   },
]
})


router.beforeEach((to, from ,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router