const mongoose = require('mongoose')
/* 图书模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  category:{
    type: mongoose.SchemaTypes.ObjectId,ref: 'Category'
  },
  author:{
    type: String
  },
  total:{
    type: Number
  },
  remain:{
    type: Number
  },
  img:{
    type: String
  },
  message:{
    type: String 
  }
})


module.exports = mongoose.model('Book',schema)