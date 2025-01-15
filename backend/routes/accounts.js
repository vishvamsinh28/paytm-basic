const express = require("express")
const router = express.Router()
const authenticate = require("../auth")
const { Account, User } = require("../db")

router.get("/balance", authenticate, async (req, res) => {
    const account = await Account.findOne({
        userID: req.userId
    });

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authenticate, async (req, res) => {
    const user = await Account.findOne({userID: req.userId})
    const { amount, to } = req.body
    const receiver = await User.findOne({username: to})
    const receiverBalance = await Account.findOne({userID: receiver._id})

    if(amount > user.balance || amount < 0){
        return res.json({
            msg: "amount should be equal to or less than balance and it cannot be in negative"
        })
    }

    await Account.findByIdAndUpdate(receiverBalance._id, {balance: receiverBalance.balance + amount})
    await Account.findByIdAndUpdate(user._id, {balance:  user.balance - amount})

    res.json({
        msg: "transfer successful"
    })
})

module.exports = router