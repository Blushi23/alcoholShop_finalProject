const express = require("express");
const auth = require("../middlewares/auth");
const Order = require("../models/Order");
const joi = require("joi");

const router = express.Router()

const orderSchema = joi.object({
    orderDate: joi.date(),
    country: joi.string().required(),
    city: joi.string().required(),
    street: joi.string().required(),
    houseNumber: joi.number().required(),
    floor: joi.number(),
    // floor: joi.string(),
    apartment: joi.number(),
    // apartment: joi.string(),
    zip: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    phone: joi.string().required(),
    deliveryInstructions: joi.string(),
    // products: joi.array().required(),
    // totalPrice: joi.number().required()

})
// const orderSchema = joi.object({
//     orderDate: joi.date().required(),
//     deliveryAddress: {
//         country: joi.string().required(),
//         city: joi.string().required(),
//         street: joi.string().required(),
//         houseNumber: joi.number().required(),
//         floor: joi.string(),
//         apartment: joi.string(),
//         zip: joi.string().required()
//     },
//     contactDetails: {
//         firstName: joi.string().required(),
//         lastName: joi.string().required(),
//         email: joi.string().required().email(),
//         phone: joi.string().required(),
//     },
//     deliveryInstructions: joi.string(),
//     products: joi.array().required(),
//     totalPrice: joi.number().required()

// })

// Create new order
// Create new order
router.post("/", auth, async (req, res) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        console.log(req.body);

        const existingOrder = await Order.findOne({ userId: req.payload._id, email: req.body.email });
        console.log("2:", req.payload);

        if (existingOrder) return res.status(404).send("This order already exists");
        console.log("3");

        const newOrder = new Order(req.body);
        console.log("4:", req.body);
        await newOrder.save();
        console.log("5");
        res.status(201).send("Order placed successfully");
        console.log("6");
    } catch (error) {
        res.status(400).send(error);
        console.log("7");
    }
});



// Get all orders
router.get("/", auth, async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.payload._id });

        if (!orders || orders.length === 0) return res.status(404).send("No orders found for this user");

        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router;