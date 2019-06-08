module.exports = app =>{
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  
  //新增数据接口
  router.post('/',async(req,res)=>{
    const model =  await req.Model.create(req.body)
    res.send(model)
  })
  //列表数据接口
  router.get('/',async(req,res)=>{
    const queryOptions = {}
    if(req.Model.modelName ==='Book'){
      queryOptions.populate = 'category'
    }
    const items =  await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  //获取详情接口
  router.get('/:id',async(req,res)=>{
    const model =  await req.Model.findById(req.params.id)
    res.send(model)
  })
  //修改接口
  router.put('/:id',async(req,res)=>{
    const model =  await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
   //删除接口
   router.delete('/:id',async(req,res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/book/:resource',async (req,res,next)=>{
    const modelName = require('inflection').classify(req.params.resource) 
    req.Model = require(`../../models/book/${modelName}`)
    next()
  },router)
}