const Product = require("../models/Product.model");

function render(req, res, next) {
    Product.findOne({ urlString: req.params.urlString })
    .then((product) => {
        if (product) {
            const data = {
                name: product.name,
                brand: product.brand,
                price: product.price,
                description: product.description,
                isInStock: product.isInStock,
                availableColors: product.availableColors,
                availableSizes: product.availableSizes,
                promotions: product.promotions,
                images: product.images,
                fullDescription: product.fullDescription
            }
            res.render('productDetails', data);
        } else {
            res.send('Cannot find that product');
        }
    })
    .catch((err) => {
        res.send(""+err);
    })
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