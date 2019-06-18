const mongoose = require('mongoose')
/* 新闻模型 */
const schema = new mongoose.Schema({
  category:{
    type:mongoose.SchemaType.ObjectId,ref:'NewCategory'
  },
  name: {
    type: String
  },
  body:{
    type:String
  }
},{
  timestamps: true
})




module.exports = mongoose.model('New',schema)