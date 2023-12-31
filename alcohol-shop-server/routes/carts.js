const express = require("express");
const auth = require("../middlewares/auth");
const Cart = require("../models/Cart")
const joi = require("joi");

const router = express.Router()

const productSchema = joi.object({
    name: joi.string().required().min(2),
    category: joi.string().required().min(2),
    image: joi.string(),
    price: joi.number().required(),
    _id: joi.string()
})

// add product to cart
router.post("/", auth, async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        let cart = await Cart.findOne({ userId: req.payload._id, active: true })

        if (!cart) return res.status(404).send("No active cart found for this user")

        // check if the product already exists and increase the quantity
        let productToFind = cart.products.find((p) => p._id == req.body._id)
        if (productToFind) {
            let indexToUpdate = cart.products.findIndex((p) => p._id == req.body._id)
            cart.products[indexToUpdate].quantity++;
            cart.markModified("products")
        } else {
            cart.products.push({ ...req.body, quantity: 1 })
        }
        await cart.save();
        res.status(201).send("Product added successfully to the cart")
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/", auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.payload._id, active: true });

        if (!cart) return res.status(404).send("No active cart found for this user");

        res.status(200).send(cart.products);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Remove product from cart
router.delete("/:id", auth, async (req, res) => {
    try {
        let cart = await Cart.findOneAndUpdate({ userId: req.payload._id, active: true }, { $pull: { products: { _id: req.params.id } } }, { new: true });

        if (!cart) return res.status(404).send("No active cart found for this user");
        res.status(200).send("Product deleted successfully from the cart")

    } catch (error) {
        res.status(400).send(error);
    }
})

router.put("/:id", auth, async (req, res) => {
    try {
        const { id: userId } = req.payload;
        const { id: productId } = req.params;

        // Find the cart where the product exists
        let cart = await Cart.findOne({ userId: req.payload._id, active: true })

        if (!cart) return res.status(404).send("Cart not found");

        // Update the quantity of the specific product
        const productIndex = cart.products.findIndex(product => product._id === productId);
        if (productIndex !== -1) {
            // Decrement the quantity by 1
            cart.products[productIndex].quantity -= 1;
            cart.markModified("products")

            // Save the updated cart
            await cart.save();


            res.status(200).send("Product quantity updated successfully");
        } else {
            res.status(404).send("Product not found in the cart");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
