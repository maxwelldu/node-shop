const express = require('express');
const router = express.Router();
const cat = require('../controllers/cat.js');

router.post('/add', cat.add);
router.get('/', cat.list);

module.exports = router;
