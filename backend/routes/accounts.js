const express = require("express")
const router = express.Router()
const authenticate = require("../auth")
const { Account, User } = require("../db")
const mongoose = require("mongoose")

router.get("/balance", authenticate, async (req, res) => {
    const account = await Account.findOne({
        userID: req.userId
    });

    res.json({
        balance: account.balance
    })
})

// this is a good approach by using transactions to ensure that all database queries either succeed or fail together.
router.post("/transfer", authenticate, async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()

    const user = await Account.findOne({userID: req.userId}).session(session)
    const { amount, to } = req.body
    const receiver = await User.findOne({username: to}).session(session)
    const receiverBalance = await Account.findOne({userID: receiver._id}).session(session)

    if(amount > user.balance || amount < 0){
        await session.abortTransaction()
        return res.json({
            msg: "amount should be equal to or less than balance and it cannot be in negative"
        })
    }

    await Account.findByIdAndUpdate(receiverBalance._id, {balance: receiverBalance.balance + amount}).session(session)
    await Account.findByIdAndUpdate(user._id, {balance:  user.balance - amount}).session(session)

    await session.commitTransaction()
    session.endSession()
    res.json({
        msg: "transfer successful"
    })
})

module.exports = router