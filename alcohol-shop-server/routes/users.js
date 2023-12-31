const express = require("express");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth")
const User = require("../models/User");
const Cart = require("../models/Cart")

const router = express.Router();


const userSchema = joi.object({
    firstName: joi.string().required("first name length must have at least 2 characters").min(2),
    lastName: joi.string().required("last name length must have at least 2 characters").min(2),
    phone: joi.string().required("phone number length must have at least 9 characters").min(9),
    email: joi.string().required("enter a valid email address").email(),
    birthDate: joi.date().required("Insert valid birth date"),
    password: joi.string().required("password length must have at least 8 characters and meet the requirements").min(8),
    country: joi.string().required("country length must have at least 2 characters").min(2),
    city: joi.string().required("city name length must have at least 2 characters").min(2),
    street: joi.string().required("street name length must have at least 2 characters").min(2),
    houseNumber: joi.number().required("enter a valid house number").min(0),
    floor: joi.number().allow(""),
    apartment: joi.number().allow(""),
    zip: joi.string().min(0),
    isAdmin: joi.boolean()
});

const loginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8)
})

//Register
router.post("/", async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).send(error)

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("This user is already exists");

        if (req.body.floor === "") req.body.floor = 0;
        if (req.body.apartment === "") req.body.apartment = 0;

        user = new User(req.body);

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        await user.save();

        //Create user's cart
        let cart = new Cart({ userId: user._id, products: [], active: true });

        await cart.save();

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin, email: user.email }, process.env.jwtKey);

        res.status(201).send(token)

    } catch (error) {
        res.status(400).send(error);
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Wrong email or password")

        const result = await bcrypt.compare(req.body.password, user.password)
        if (!result) return res.status(400).send("Wrong email or password");

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin, email: user.email }, process.env.jwtKey);

        res.status(200).send(token);

    } catch (error) {
        res.status(400).send(error);
    }
})

//Get all users
router.get("/", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin == true) return res.status(400).send("This user is not admin. Access denied");
        let users = await User.find()
        if (!users) return res.status(404).send("No users found");
        res.status(200).send(users)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

//Get specific user by Id
router.get("/:id", auth, async (req, res) => {
    try {
        if (req.payload.isAdmin == false && req.payload._id !== req.params.id) return res.status(400).send("Access denied");
        let user = await User.findById({ _id: req.params.id })
        if (!user) return res.status(404).send("No user found");

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})
//Edit user's profile
router.put("/:id", auth, async (req, res) => {
    try {
        if (req.payload.isAdmin == false && !req.payload._id == req.params.id) return res.status(400).send("Access denied. No authorization to edit this profile");

        const { error } = userSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        await user.save();

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Update user's role 
router.patch("/:id", auth, async (req, res) => {
    try {

        const { isAdmin } = req.body;
        if (req.payload.isAdmin === false) return res.status(400).send("Access denied! You cannot edit this profile.");

        let user = await User.findByIdAndUpdate({ _id: req.params.id }, { isAdmin: isAdmin }, { new: true });
        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

//Delete specific user
router.delete("/:id", auth, async (req, res) => {
    try {
        if (req.payload.isAdmin == false || !req.payload._id == req.params.id) return res.status(400).send("Access denied. You are not allowed");

        const user = await User.findByIdAndDelete({ _id: req.params.id });

        if (!user) return res.status(404).send("No user found");

        await Cart.deleteMany({ userId: req.params.id });

        res.status(200).send("User deleted successfully");

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;