const mongoose = require('mongoose')
/* 新闻公告文章模型 */
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ArticleCategory'
  }],
  body: {
    type: String,
    select: false
  },
}, {
  timestamps: true
})



module.exports = mongoose.model('Article', schema)