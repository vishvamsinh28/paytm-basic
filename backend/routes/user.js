require("dotenv").config();
const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;

        const UserValidation = zod.object({
            username: zod.string().min(3).max(12),
            firstname: zod.string().min(3).max(12),
            lastname: zod.string().min(3).max(12),
            password: zod.string().min(3).max(12),
        });

        const result = UserValidation.safeParse(req.body);

        if (!result.success) {
            return res.json({
                msg: "Validation failed please enter correct input value",
                err: result.error,
            });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.json({
                msg: "User already exists use new id to create account or login",
            });
        }

        const user = await User.create({
            username,
            firstname,
            lastname,
            password,
        });

        const userID = user._id;
        const accountBalace = Math.floor(Math.random() * 1000) + 1;

        await Account.create({
            userID,
            balance: accountBalace,
        });

        const JWTtoken = jwt.sign({ userID }, process.env.JWT_SECRET);

        res.json({
            msg: "User created succesfully!",
            token: JWTtoken,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await User.findOne({ username });

        if (!userExists) {
            return res.json({
                msg: "User doesn't exits",
            });
        }

        if (userExists.username == username && userExists.password == password) {
            const userID = userExists._id;
            const JWTtoken = jwt.sign({ userID }, process.env.JWT_SECRET);

            return res.json({
                msg: "login Successful",
                token: JWTtoken,
                proceed: true
            });
        }

        res.json({
            msg: "Error while login",
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
