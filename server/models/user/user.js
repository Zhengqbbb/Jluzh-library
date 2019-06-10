const mongoose = require('mongoose')
/* 用户模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  
})


module.exports = mongoose.model('User', schema)