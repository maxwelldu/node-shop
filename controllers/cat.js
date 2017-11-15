const Cat = require('../models/cat');
const Joi = require('joi');
const CatJoi = require('../joi/cat');

module.exports = {
  add(req, res) {
    Joi.validate(req.body, CatJoi.add)
    .then(() => {
      const {title} = req.body;
      let cat = new Cat({ title });
      cat.save((err, cat) => {
        if (err) throw err;
        return res.json({
          code: 0,
          msg: '添加成功'
        })
      })
    }).catch(err => {
      return res.json({
        code: 5,
        msg: err.details[0].message
      })
    })
  },
  list(req, res) {
    Cat.find({}, (err, cats) => {
      if (err) throw err;
      res.json({
        code: 0,
        data: cats
      })
    })
  }
}
