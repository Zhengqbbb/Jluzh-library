const mongoose = require('mongoose')
/* 用户账户模型 */
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  card: {
    type: String
  },
  lends: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Book'
  }]

}, {
  timestamps: true
})


module.exports = mongoose.model('Reader', schema)