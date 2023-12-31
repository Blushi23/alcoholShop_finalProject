const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const users = require("./routes/users")
const products = require("./routes/products")
const carts = require("./routes/carts")
const orders = require("./routes/orders")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(morgan(':date[clf] :method :url :status :response-time ms'));
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use("/api/orders", orders);

app.listen(port, () => console.log("Server started on port", port)); 