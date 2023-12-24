const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        //Get the token from the request
        const token = req.header("Authorization");
        if (!token) return res.status(401).send("No valid token. Access denied.");

        //Check the token
        const payload = jwt.verify(token, process.env.jwtKey);

        //Save the payload
        req.payload = payload;

        next();

    } catch (error) {
        res.status(400).send(error)
    }
}