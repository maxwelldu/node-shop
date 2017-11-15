const express = require('express');
const router = express.Router();
const user = require('../controllers/user.js');

router.post('/register', user.register);
router.post('/auth', user.auth);
router.post('/checkUserNameUnique', user.checkUserNameUnique);

module.exports = router;
