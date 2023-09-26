var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/:urlString', productController.render);
router.post('/register', productController.register);

module.exports = router;