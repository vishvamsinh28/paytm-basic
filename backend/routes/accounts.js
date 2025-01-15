const express = require("express")
const router = express.Router()
const authenticate = require("../auth")
const { Account } = require("../db")

router.get("/balance", authenticate, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})

module.exports = router