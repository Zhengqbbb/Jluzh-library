# jluzh-library
个人全栈课程设计——图书馆官网管理系统
## 说明
* admin 后台界面
* server 整个项目的服务端
* web 客户端界面


## 后台前端
*  技术栈:<code>Vue.cli</code>
* router 路由管理器，对路由进行管理
* ElementUI 组件进行开发
* axios 进行异步请求操作
* localStorage 作登录状态管理


##  服务端
*  技术栈:<code>node.js,</code><code>MongoDB</code>
* Express框架 处理数据接口
* mongoose 建立数据模型
* Express static中间件对静态文件托管
* cors 作跨域访问
* bcrypt 用于对密码进行加密处理
* JSON Web Token 对登录状态码的生成以及验证
* http-assert 用于错误处理
* inflection 用于对传入路径字符串进行类名的转换
* multer Express中间件实现前端传入文件进行保存


## 前台前端
*  技术栈:<code>Vue.cli</code>
* SCSS 工具类样式对css进行开发
* router 路由管理器，对路由进行管理
* Vue-Awesome-Swiper 组件用于首页轮播图,书籍推荐界面,分类卡片应用 Github:[https://github.com/surmon-china/vue-awesome-swiper]
* axios 进行异步请求操作
* CategoryCard BookCard 自定义封装分类与图书卡片组件
* ElementUI 组件应用在label,消息提示
