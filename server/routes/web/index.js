module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  


//首页轮播图数据接口
  router.get('/home/ad', async (req, res) => {
    const Ad = require('../../models/admin/Ad')
    const Ads = await Ad.findOne({
      name: '轮播图'
    }).lean()
    res.send(Ads)
  })

//图书列表




  app.use('/web/api', router)
}