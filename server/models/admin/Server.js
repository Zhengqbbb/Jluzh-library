const mongoose = require('mongoose')
/* 服务模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  ico:{
    type: String
  },
  body:{
    type:String
  }
},{
  timestamps: true
})




module.exports = mongoose.model('Server',schema)