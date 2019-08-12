const express = require("express")
const compression = require('compression')

const app = express()
//全局JWT密钥
app.set('secret', 'abcdfg')

// 启用gzip
app.use(compression());

app.use(require('cors')())
app.use(express.json())
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))


require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)


app.listen(3000, () => {
  console.log('http://localhost:3000')
});

