module.exports = app => {
  const router = require('express').Router({
    mergeParams: true
  })
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const mongoose = require('mongoose')
  const Ad = require('../../models/admin/Ad')
  const Book = require('../../models/book/Book')
  const BookCats = require('../../models/book/Category')
  const Article = require('../../models/admin/Article')
  const ArticleCats = require('../../models/admin/ArticleCategory')
  const Server = require('../../models/admin/Server')
  const Reader = require('../../models/reader/Reader')


  //首页轮播图数据接口
  router.get('/home/ad', async (req, res) => {
    const Ads = await Ad.findOne({
      name: '轮播图'
    }).lean()
    res.send(Ads)
  })
  //首页书籍推荐接口
  router.get('/home/book', async (req, res) => {
    const books = await Book.find().limit(9).sort({
      '_id': -1
    }).lean()
    res.send(books)
  })
  //首页新闻公告接口
  router.get('/home/new', async (req, res) => {
    const news = await Article.find().sort({
      '_id': -1
    }).populate('categories').limit(8).lean()
    res.send(news)
  })
  //首页服务接口
  router.get('/home/server', async (req, res) => {
    const servers = await Server.find().limit(9).lean()
    res.send(servers)
  })

  //图书列表
  router.get('/book/list', async (req, res) => {
    const cats = await BookCats.find()
    const booklist = await BookCats.aggregate([{
        $match: {
          cat: cats.id
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'category',
          as: 'bookList'
        }
      },
      {
        $project: {
          bookList: {
            message: 0
          }
        }
      },
    ])
    booklist.unshift({
      name: '所有',
      bookList: await Book.find().populate('category').lean()
    })

    booklist.map(cat => {
      cat.bookList.map(books => {
        books.categoryName = (cat.name === '所有') ?
          books.category.name : cat.name
        return books
      })
      return cat
    })

    res.send(booklist)
  })

  // 图书详情页接口
  router.get('/book/infor/:id', async (req, res) => {
    const model = await Book.findById(req.params.id).select('+message').populate('category').lean()
    res.send(model)
  })

  // 新闻公告列表
  router.get('/new/list', async (req, res) => {
    const cats = await ArticleCats.find()
    const articlelist = await ArticleCats.aggregate([{
        //条件查询类似于 where过滤
        $match: {
          cat: cats._id
        }
      },
      {
        //类似与关系型数据库的左外连接 join
        $lookup: {
          //关联哪个表,默认是模型名的小写复数
          from: 'articles',
          //类似于虚拟字段，本地键对应的外地键,别名as
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      {
        $project: {
          newsList: {
            body: 0
          }
        }
      },
      {
        //添加字段限制添加几个
        $addFields: {
          newsList: {
            $slice: ['$newsList', 21]
          }
        }
      }
      //聚合排序失难搞
      /* ,{$sort:{newsList:-1,_id:-1}} */
    ])

    //添加虚拟字段“所有”
    articlelist.unshift({
      name: '所有',
      newsList: await Article.find().sort({
        '_id': -1
      }).populate('categories').limit(21).lean()
    })
    //添加categoryName
    articlelist.map(cat => {

      cat.newsList.map(news => {
        news.categoryName = (cat.name === '所有') ?
          news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(articlelist)
  })

  // 新闻详情页接口
  router.get('/new/infor/:id', async (req, res) => {
    const model = await Article.findById(req.params.id).select('+body').populate('category').lean()
    res.send(model)
  })

  //服务列表接口
  router.get('/server', async (req, res) => {
    const model = await Server.find().lean()
    res.send(model)
  })
  //服务详情页接口
  router.get('/server/infor/:id', async (req, res) => {
    const model = await Server.findById(req.params.id).select('+body').lean()
    res.send(model)
  })

  //读者详情页接口
  router.get('/reader/:id', async (req, res) => {
    const model = await Reader.findById(req.params.id).populate('lends').lean()
    res.send(model)
  })
  //读者修改接口
  router.put('/reader/:id', async (req, res) => {
    const model = await Reader.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

    //登录接口
    router.post('/login', async (req, res) => {
      const {
        username,
        password
      } = req.body
      const user = await Reader.findOne({
        username: username
      }).select('+password')
      /* 原生处理，现在用http-assert处理 
        下载:npm i http-assert */
        if (!user) {
        return res.status(422).send({
          message: '账户不存在'
        })
      }
      /* assert(user, 422, '账户不存在') */
      const isValid = require('bcrypt').compareSync(password, user.password)
     /*  assert(isValid, 422, '密码错误') */
     if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
  
  
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

  

  app.use('/web/api', router)
}