const mongoose = require('mongoose')
/* 用户账户模型 */
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
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
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }

}, {
  timestamps: true
})


module.exports = mongoose.model('Reader', schema)