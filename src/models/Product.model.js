var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name can't be blank."]
    },
    urlString: {
        type: String,
        lowercase: true
    },
    brand: {
        type: String,
        trim: true,
        required: [true, "Brand can't be blank."]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Price can't be blank."]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description can't be blank."]
    },
    isInStock: {
        type: Boolean,
        trim: true,
        required: [true, "Stock information can't be blank."]
    },
    availableColors: {
        type: [String],
        required: [true, "Available colors can't be blank."]
    },
    availableSizes: {
        type: [String],
        required: [true, "Available sizes can't be blank."]
    },
    promotions: {
        type: String,
        trim: true,
        required: [true, "Promotions can't be blank."]
    },
    images: {
        type: [String],
        required: [true, "Images can't be blank."]
    },
    fullDescription: {
        type: String,
        trim: true,
        required: [true, "Full description can't be blank."]
    },
}, {timestamps: true,});

productSchema.method({
    setUrlString(){
        this.urlString = this.name.replace(/\s+/g,"-");
        this.urlString = this.urlString + "-p-" + Math.floor(Math.random() * 1000000);
    }
});

module.exports = mongoose.model("product", productSchema);