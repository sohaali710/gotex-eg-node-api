const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.logIn = (req, res) => {
    const { email, password } = req.body

    try {
        if (process.env.ADMINPASS == password) {
            const user = {
                id: 1,
                name: "admin",
                roll: "admin"
            }

            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: { user },
            }, process.env.ACCESS_TOKEN);

            res.status(200).json({ msg: "ok", token })
        } else {
            res.status(400).json({
                msg: "wrong password or email"
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}

/** User CRUD */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ results: users.length, data: { users } })
    } catch (err) {
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}
exports.addWalletToUser = async (req, res) => {
    const { id, deposit } = req.body

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({ msg: "This user doesn't exist" })
        }

        user.wallet = user.wallet + deposit;
        user.isSentBalanceAlert = false
        await user.save()

        res.status(200).json({ msg: "ok" })
    } catch (err) {
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}
exports.proofCrForUser = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Wrong email" })
        }

        user.isCrProofed = true;
        await user.save()

        res.status(200).json({ msg: "ok" })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}
exports.unProofCrForUser = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Wrong email" })
        }

        user.isCrProofed = false;
        await user.save()

        res.status(200).json({ msg: "ok" })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}