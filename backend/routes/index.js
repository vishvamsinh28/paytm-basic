const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const { User } = require("../db");
const authenticate = require("../auth");
const accountRoutes = require("./accounts");
const zod = require("zod");

router.use("/user", userRoutes);
router.use("/account", accountRoutes);

router.put("/user", authenticate, async (req, res) => {
    try {

        // using zod validation because mongoose only validate while creating the object
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
        msg: finalData,
    });
});

module.exports = router;
