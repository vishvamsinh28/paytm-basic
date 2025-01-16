require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userID;
        next();
    } catch (err) {
        res.json({ err });
    }
}

module.exports = authenticate;
