require('dotenv').config()
const jwt = require("jsonwebtoken");

async function authenticate(req, res) {
    try {

        const token = req.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();

    } catch (err) {
        res.json({ err })
    }
}

module.exports = authenticate