const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const users = require("./routes/users")
const products = require("./routes/products")
const carts = require("./routes/carts")
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

const projectId = process.env.MONGO_ATLAS_PROJECT_ID
const clusterName = process.env.MONGO_ATLAS_CLUSTER
const publicKey = process.env.MONGO_ATLAS_PUBLIC_KEY
const privateKey = process.env.MONGO_ATLAS_PRIVATE_KEY
// const atlasSearch = `${ATLAS_CLUSTER_API_URL}/fts/indexes`
const digestAuth = `${publicKey}:${privateKey}`
const USER_SEARCH_INDEX_NAME = 'user_search'
const USER_AUTOCOMPLETE_INDEX_NAME = 'user_autocomplete'










app.listen(port, () => console.log("Server started on port", port)); 