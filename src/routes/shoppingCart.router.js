var express = require('express');
var router = express.Router();
const shoppingCartController = require('../controllers/shoppingCart.controller');

router.get('/', shoppingCartController.render);

module.exports = router;