module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Ad = require('../../models/admin/Ad')
  const Book = require('../../models/book/Book')
  const BookCats = require('../../models/book/Category')
  



  //首页轮播图数据接口
  router.get('/home/ad', async (req, res) => {
    const Ads = await Ad.findOne({
      name: '轮播图'
    }).lean()
    res.send(Ads)
  })
  //首页书籍推荐接口
  router.get('/home/book',async (req,res)=>{
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
      }
    ])
    booklist.unshift({
      name: '所有',
      bookList: await Book.find().populate('category').lean()
    })

    booklist.map(cat => {
      cat.bookList.map(books =>{
        books.categoryName = (cat.name === '所有') 
        ? books.category.name : cat.name
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



  app.use('/web/api', router)
}