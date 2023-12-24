const mongoose = require("mongoose");
const moment = require("moment")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        minlength: 2
    },
    lastName: {
        type: String,
        required: false,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: false,
        minlength: 9
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    country: {
        type: String,
        required: false,
        minlength: 2
    },
    city: {
        type: String,
        required: false,
        minlength: 2
    },
    street: {
        type: String,
        required: false,
        minlength: 2
    },
    houseNumber: {
        type: Number,
        required: false
    },
    floor: {
        type: Number,
        required: false
    },
    apartment: {
        type: Number,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model("users", userSchema);
module.exports = User;