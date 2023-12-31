const express = require("express");
const auth = require("../middlewares/auth");
const joi = require("joi");

const Product = require("../models/Product");
const router = express.Router();

const productSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required(),
    category: joi.string().required().min(2),
    subcategory: joi.string().required().min(2),
    description: joi.string().required().min(2),
    volume: joi.number().allow(""),
    alcoholPercentage: joi.string().allow(""),
    origin: joi.string().allow(""),
    image: joi.string().allow(""),
    quantity: joi.number()
})

// Add new product
router.post("/", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) return res.status(400).send("Admin access only");

        const { error } = productSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        let product = await Product.findOne({ name: req.body.name, category: req.body.category });
        if (product) return res.status(400).send("Product already exists");

        product = new Product(req.body);
        await product.save();

        res.status(201).send(product);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) return res.status(404).send("No products found");

        res.status(200).send(products)

    } catch (error) {
        res.status(400).send(error);
    }
})

// Get all products from the same category
router.get("/:category", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        if (!products) return res.status(404).send("No products found");
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
})
// Get all products from the same subcategory
router.get("/:category/:subcategory", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category, subcategory: req.params.subcategory });
        if (!products) return res.status(404).send("No products found");
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Get specific product
router.get("/:category/:subcategory/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product doesn't exist");
        res.status(200).send(product);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Edit products
router.put("/:category/:subcategory/:id", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) return res.status(400).send("Product edit can be done by admin only");

        const { error } = productSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        let product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        if (!product) return res.status(400).send("Product already exists");

        res.status(200).send(product);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Delete product
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) return res.status(400).send("Product deletion can be done by admin only");

        let product = await Product.findOneAndDelete({ _id: req.params.id })

        if (!product) return res.status(404).send("No product found");
        res.status(200).send("Product deleted successfully")
    } catch (error) {
        res.status(400).send(error);
    }
})

// // Searching from the data base
router.get("/search", async (req, res) => {
    try {
        const { key } = req.query;
        const products = await Product.find({ $text: { $search: key } }).limit(5);

        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;