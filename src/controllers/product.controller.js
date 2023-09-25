const Product = require("../models/Product.model");

function render(req, res, next) {
    res.render('productDetails');
}

async function register(req, res){
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      isInStock: req.body.isInStock,
      availableColors: req.body.availableColors,
      availableSizes: req.body.availableSizes,
      promotions: req.body.promotions,
      images: req.body.images,
      fullDescription: req.body.fullDescription,
    });
    try {
        product.setUrlString();
        await product.save();
        res.send(product);
    } catch(error) {
        res.status(500).send(error)
    }
};

module.exports = {
    render,
    register
}