const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    houseNumber: {
        type: Number,
        required: true
    },
    floor: {
        type: Number
    },
    apartment: {
        type: Number
    },
    zip: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    deliveryInstructions: {
        type: String,
        default: ""
    },
},
    { timeStamps: true })

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;