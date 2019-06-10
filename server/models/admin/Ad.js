const mongoose = require('mongoose')
/* 运营模型 */
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  items: [{
    img: {
      type: String
    },
    url: {
      type: String
    },
  
  }
  ]

  }
   )


module.exports = mongoose.model('Ad', schema)




