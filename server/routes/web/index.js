module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  



  router.get('/home/ad', async (req, res) => {
    const Ad = require('../../models/admin/Ad')
    const Ads = await Ad.findOne({
      name: '轮播图'
    }).lean()
    res.send(Ads)
  })





  app.use('/web/api', router)
}