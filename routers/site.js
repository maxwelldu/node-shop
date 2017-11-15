const express = require('express');
const router = express.Router();
const site = require('../controllers/site.js');

router.post('/add', site.add);
router.get('/', site.list);

module.exports = router;
