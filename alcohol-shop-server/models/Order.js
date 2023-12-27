const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryAdress: {
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
            type: String
        },
        apartment: {
            type: String
        },
        zip: {
            type: String,
            required: true
        }
    },
    contactDetails: {
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
        }
    },
    deliveryInstructions: {
        type: String
    },

    products: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
},
    { timeStamps: true })

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;