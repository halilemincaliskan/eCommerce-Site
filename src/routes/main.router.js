var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');

router.get('/', mainController.getUser);

router.post('/', mainController.postUser);

module.exports = router;