var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', authController.login);

router.get('/user', authController.getUser);

router.post('/', authController.register);

module.exports = router;