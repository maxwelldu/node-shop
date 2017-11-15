const Site = require('../models/site');
const Joi = require('joi');
const SiteJoi = require('../joi/site');

module.exports = {
  add(req, res) {
    Joi.validate(req.body, SiteJoi.add)
    .then(() => {
      const { name, desc, url } = req.body;
      let site = new Site({ name, desc, url });
      site.save((err, site) => {
        if (err) throw err;
        return res.json({
          code: 0,
          msg: '添加站点成功'
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
    Site.find({}, (err, sites) => {
      if (err) throw err;
      res.json({
        code: 0,
        data: sites
      })
    })
  }
}
