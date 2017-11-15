const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('./config.js');
const user = require('./routers/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'));

app.use((req,res,next) => {
  //如果已经登录或者是登录接口或者是首页商品列表则放行
  const allowVisitWithoutToken = [
    '/api/user/register',
    '/api/user/auth',
    '/api/user/checkUserNameUnique'
  ]
  if(allowVisitWithoutToken.indexOf(req.originalUrl) > -1 || req.originalUrl.indexOf('/goods/list')>-1){
    next();
  }else{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.SECRET, (err, decode) => {
      if (err) {
        return res.json({
          code: 4,
          msg: 'token失效'
        });
      }
      next();
    })
  }
});

app.use('/api/user', user);

// 最后一个路由处理 404
app.use((req, res) => {
  res.json({
    code: 404,
    msg: 'Not Found'
  });
})
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('api app listening at http://%s:%s', host, port);
})
