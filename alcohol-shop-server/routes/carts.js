const express = require("express");
const auth = require("../middlewares/auth");
const Cart = require("../models/Cart")
const joi = require("joi");

const router = express.Router()

const productSchema = joi.object({
    name: joi.string().required().min(2),
    // description: joi.string().required().min(2),
    category: joi.string().required().min(2),
    // subcategory: joi.string().required().min(2),
    image: joi.string(),
    price: joi.number().required(),
    _id: joi.string()
    //quantity:joi.unmber().required()
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

// Update quantity in cart
// router.put("/:id", auth, async (req, res) => {
//     try {
//         let { id: userId } = req.payload;
//         let { id: productId } = req.params;
//         let { quantity } = req.body;

//         //         let cart = await Cart.findOneAndUpdate({ userId, active: true, "products._id": productId }, { $set: { "products.$.quantity": quantity } }, { new: true });
//         // let cart;
//         // if (quantity === 0) {
//         //     cart = await Cart.findOneAndUpdate({ userId, active: true }, { $pull: { products: { _id: productId } } }, { new: true });

//         // } else {
//         //     cart = await Cart.findOneAndUpdate({ userId, active: true, "products._id": productId },
//         //         { $set: { "products.$.quantity": quantity } },
//         //         { new: true });
//         // }

//         if (!cart) return res.status(404).send("Cart not found");

//         res.status(200).send("Product quantity updated successfully");
//     } catch (error) {
//         res.status(400).send(error);

//     }
// })

router.put("/:id", auth, async (req, res) => {
    try {
        const { id: userId } = req.payload;
        const { id: productId } = req.params;

        // Find the cart where the product exists
        // const cart = await Cart.findOne({ userId, active: true, "products._id": productId });
        let cart = await Cart.findOne({ userId: req.payload._id, active: true })

        if (!cart) return res.status(404).send("Cart not found");

        // Update the quantity of the specific product
        const productIndex = cart.products.findIndex(product => product._id === productId);
        if (productIndex !== -1) {
            // Decrement the quantity by 1
            cart.products[productIndex].quantity -= 1;
            cart.markModified("products")
            console.log(cart.products[productIndex]);

            // Save the updated cart
            await cart.save();

            console.log("After" + cart.products[productIndex].quantity);

            res.status(200).send("Product quantity updated successfully");
        } else {
            res.status(404).send("Product not found in the cart");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;

