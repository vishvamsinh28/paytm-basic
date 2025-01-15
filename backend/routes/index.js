const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const { User } = require("../db");
const authenticate = require("../auth");

router.use("/user", userRoutes);

router.put("/user", authenticate, async (req, res) => {
    try {
        console.log("User ID:", req.userId);
        const updatedData = await User.updateOne({ _id: req.userId }, req.body);

        res.json({
            msg: "Update success!",
            updatedData,
            data: req.body,
        });
    } catch (err) {
        res.json({
            msg: "Error while updating",
            err,
        });
    }
});

router.get("/user/bulk", authenticate, async (req, res) => {
    const { filter } = req.query;

    const users = await User.find({
        $or: [
            {
                firstname: {
                    $regex: filter,
                },
            },
            {
                lastname: {
                    $regex: filter,
                },
            },
        ],
    });

    const finalData = users.map((user) => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user._id,
    }));

    res.json({
        msg: finalData
    })
});

module.exports = router;
