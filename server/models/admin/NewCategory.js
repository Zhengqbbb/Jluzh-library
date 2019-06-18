const mongoose = require('mongoose')
/* 新闻分类模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  }
})




module.exports = mongoose.model('NewCategory',schema)