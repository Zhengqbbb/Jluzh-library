module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/admin/AdminUser')
  const ArticleCategory = require('../../models/admin/ArticleCategory')
  const router = express.Router({
    mergeParams: true
  })

//管理员修改密码接口
/* router.post('/admin/api/checkpassword', async (req, res,) => {
  const reqPassword = req.body
  const user = await req.Model.findById(req.param.id).select('+password')
  const isValid = require('bcrypt').compareSync(reqPassword , user.password)
  assert(isValid, 422 , 原始密码错误) 
}) */

  //新增数据接口
  router.post('/', async (req, res,) => {
    const model = await req.Model.create(req.body)
    res.send(model)  
  })

  //列表数据接口
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Book') {
      queryOptions.populate = 'category'
    }else if(req.Model.modelName === 'Article'){
      queryOptions.populate = 'categories'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  //获取详情接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id).select('+message').select('+body')
    res.send(model)
  })
  //修改接口
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除接口
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //TODO:模糊查询封装
  /*  router.get('/:bookname',async(req,rep)=>{
     const bookname = req.params.bookname
     
     const data = await Model.find({''})
     res.send(data)
   }) */




/**
 * 登录验证处理函数中间件封装
 * auth
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authMiddleware = require('../../middleware/auth')
  


  //图书资源路由
  app.use('/admin/api/book/:resource', authMiddleware() ,async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/book/${modelName}`)
    next()
  }, router)

  //用户资源路由
  app.use('/admin/api/reader/:resource', authMiddleware() ,async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/reader/${modelName}`)
    next()
  }, router)

  //广告资源路由
  app.use('/admin/api/ad/:resource', authMiddleware() ,async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/admin/${modelName}`)
    next()
  }, router)
  
  //新闻公告路由
  app.use('/admin/api/article/:resource', authMiddleware() ,async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/admin/${modelName}`)
    next()
  }, router)

  //服务资源路由
  app.use('/admin/api/server/:resource', authMiddleware() ,async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/admin/${modelName}`)
    next()
  }, router)

  //管理员资源路由
  app.use('/admin/api/admin/:resource', authMiddleware() ,async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/admin/${modelName}`)
    next()
  }, router)

  //TODO:模糊查询
  /*  app.get('/admin/api/search/:bookname',async(req,res)=>{
     const bookname = req.params.bookname
     const Model = require('../../models/book/Book')
     const data = await Model.find({name:{$regex:`{bookname}`}})
     const queryOptions = {}
     if(Model==='Book'){
       queryOptions.populate = 'category'
     }
     const items =  await Model.find({name:{$regex:`{bookname}`}}).setOptions(queryOptions).limit(10)
     res.send(items)
     
   }) */

  /**
   * 上传路由
   */
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', authMiddleware() ,upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  /**
   * 登录路由:
   * 1 根据用户名找用户(select('+password')因为我们已经默认取不出，要手动取出)
   * 2 校验密码
   * 3 返回token
   */
  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body
    const AdminUser = require('../../models/admin/AdminUser')
    const user = await AdminUser.findOne({
      username: username
    }).select('+password')
    /*原生处理，现在用http-assert处理 
      下载:npm i http-assert
      if (!user) {
      return res.status(422).send({
        message: '账户不存在'
      })
    } */
    assert(user, 422, '账户不存在')
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')


    /**
     * 安装token: npm i jsonwebtoken
     */
    const token = jwt.sign({
      id: user.id,
    }, app.get('secret'))
    res.send({
      token
    })
  })



  /**
   * express 错误处理函数
   */
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}