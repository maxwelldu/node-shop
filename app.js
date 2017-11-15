const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');
const app = express();
const config = require('./config.js');
const user = require('./routers/user');
const cat = require('./routers/cat');

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
const limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  handler: function(req, res) {
    res.status(429).json({ message: "已经超过频率限制" });
  }
});

// only apply to requests that begin with /api/
app.use('/api/', limiter);

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
    '/api/user/checkUserNameUnique',
    '/api/cat'
  ];
  // 白名单，非白名单的跳过，最后会执行404
  let whiteList = [
    '/api/cat/add'
  ]
  whiteList = allowVisitWithoutToken.concat(whiteList);
  if(allowVisitWithoutToken.indexOf(req.originalUrl) > -1 || req.originalUrl.indexOf('/goods/list')>-1){
    next();
  }else{
    if (whiteList.indexOf(req.originalUrl) === -1) {
      next();
    }
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
app.use('/api/cat', cat);

// 最后一个路由处理 404
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    msg: 'Not Found'
  });
})
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('api app listening at http://%s:%s', host, port);
})
