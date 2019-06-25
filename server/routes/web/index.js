module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Ad = require('../../models/admin/Ad')
  const Book = require('../../models/book/Book')
  const BookCats = require('../../models/book/Category')
  const Article = require('../../models/admin/Article')
  const ArticleCats = require('../../models/admin/ArticleCategory')




  //首页轮播图数据接口
  router.get('/home/ad', async (req, res) => {
    const Ads = await Ad.findOne({
      name: '轮播图'
    }).lean()
    res.send(Ads)
  })
  //首页书籍推荐接口
  router.get('/home/book', async (req, res) => {
    const books = await Book.find().lean()
    res.send(books)
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
         bookList:{
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
         newsList:{
           body: 0
         }
        }
      },
      {
        //添加字段限制添加几个
        $addFields: {
          newsList: {
            $slice: ['$newsList', 21],
          }
        }
      }
    ])

   //添加虚拟字段“所有”
     articlelist.unshift({
      name: '所有',
      newsList: await Article.find().populate('categories').limit(21).lean()
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



  app.use('/web/api', router)
}