const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        require: true
    },

    category: {
        type: String,
        minlength: 2,
        required: true
    },
    subcategory: {
        type: String,
        required: true,
        default: ""
    },
    description: {
        type: String,
        minlength: 2,
        required: true
    },
    volume: {
        type: Number
    },
    origin: {
        type: String,
        default: ""
    },
    alcoholPercentage: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
})

const Product = mongoose.model("products", productSchema);
module.exports = Product;