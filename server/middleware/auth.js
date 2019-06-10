module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/admin/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    //decode解密   verify验证
    assert(token, 401, '请先登录')
    const {
      id
    } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
  
    await next()
  }
}