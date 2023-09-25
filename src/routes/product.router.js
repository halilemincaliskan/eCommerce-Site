var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.render);
router.post('/register', productController.register);

module.exports = router;