const mongoose = require('mongoose')
/* 分类模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  

})


module.exports = mongoose.model('User',schema)