var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', authController.pageLoad);

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/user', authController.getUser);

// For Test
router.get('/user/test', authController.test);
router.get('/user/test2', authController.test2);

module.exports = router;