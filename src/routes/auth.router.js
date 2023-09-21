var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', authController.login);

router.post('/', authController.register);

module.exports = router;