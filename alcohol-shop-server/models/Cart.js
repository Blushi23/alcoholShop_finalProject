const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    active: {
        type: Boolean
    }
})

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;