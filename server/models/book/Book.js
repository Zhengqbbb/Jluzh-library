const mongoose = require('mongoose')
/* 图书模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  category:{
    type: mongoose.SchemaTypes.ObjectId,ref: 'Category'
  }
})


module.exports = mongoose.model('Book',schema)