const mongoose = require('mongoose')
/* 分类模型 */
const schema = new mongoose.Schema({
  username: {
    type: String, 
    unique: true,
  },
  password: {
    type: String , 
    /**
     * 使用bcrypt进行加密
     * 下载npm i bcrypt
     * select: false 则不会传递加密密文到前端
     * @param {密码} val 
     */
    select: false,
    set(val){
      return require('bcrypt').hashSync(val, 10)
    }
  }
})


module.exports = mongoose.model('AdminUser',schema)