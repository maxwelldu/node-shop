const common = require('../utils/common');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Joi = require('joi');
const UserJoi = require('../joi/user');

function __checkUserNameUnique(condition, cb) {
  User.findOne(condition, (err, user) => {
    if (err) throw err;
    cb && cb(!!user);
  })
}
const user = {
  checkUserNameUnique(req, res) {
    Joi.validate(req.body, UserJoi.checkUserNameUnique)
    .then(() => {
      const {username, site} = req.body;
      console.log(site);
      __checkUserNameUnique({username, site}, status => {
        return res.json({
          code: 0,
          status: status ? 1 : 0,
          msg: status ? '用户名已注册' : '用户名可用'
        })
      })
    }).catch( err => {
      res.json({
        code: 5,
        msg: err.details[0].message
      })
    })
  },
  register(req, res) {
    Joi.validate(req.body, UserJoi.register)
    .then(() => {
      let {username, password, site} = req.body;
      //:TODO 验证用户名是否已注册
      password = common.generatePassword(password);
      let user = new User({
        username,
        password,
        site
      });
      user.save((err, doc) => {
        if (err) {
          return res.json({
            code: 1,
            msg: '注册失败'
          });
        }
        return res.json({
          code: 0,
          msg: '注册成功'
        })
      })
    }).catch(err => {
      res.json({
        code: 5,
        msg: err.details[0].message
      })
    });
  },
  auth(req, res) {
    Joi.validate(req.body, UserJoi.auth)
    .then(() => {
      let {username, password, site} = req.body
      User.findOne({ username, site }, (err, user) => {
        if (err) throw err;
        if (!user) {
          return res.json({ code: 2, msg: '认证失败，该用户未注册'});
        }
        if (user.password !== common.generatePassword(password)) {
          return res.json({ code: 3, msg: '认证失败，密码错误'});
        }

        console.log(user);
        const token = jwt.sign({username: user.username}, config.SECRET, {
          expiresIn: '30 days'
        });
        res.json({
          code: 0,
          msg: '认证成功',
          data: {
            token,
            site
          }
        })
      })
    }).catch(err => {
      res.json({
        code: 5,
        msg: err.details[0].message
      })
    });
  }
}
module.exports = user
