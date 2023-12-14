const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Order = require("../model/orders/order");
const paginate = require("../modules/paginate");

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


/** Orders CRUD */
/**
 * @Desc :  Filter with paytype or keyword (user data -> name, email or mobile)
 *        + Filter by date
 *        + Pagination
 */
exports.getAllOrders = async (req, res) => {
    /** Pagination -> default: page=1, limit=30 (max number of items (orders) per page)*/
    let page = +req.query.page || 1
    const limit = +req.query.limit || 30
    const startDate = req.query.startDate || new Date('2000-01-01')
    const endDate = req.query.endDate || new Date()
    const { paytype = '', keyword = '' } = req.query

    try {
        let orders = await Order.find({
            paytype: { $regex: paytype, $options: 'i' },// $options: 'i' to make it case-insensitive (accept capital or small chars)
            created_at: {
                $gte: startDate,
                $lte: endDate
            }
        }).populate({
            path: 'user', /**@Desc if users.name or user.email != keyword, it returns user=null */
            match: {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { email: { $regex: keyword, $options: 'i' } },
                    { mobile: { $regex: keyword, $options: 'i' } }
                ]
            }
        });

        if (keyword) {
            orders = orders.filter(order => order.user) // filter orders to remove user=null
        }

        const ordersPagination = paginate(orders, page, limit)
        res.status(200).json({ ...ordersPagination })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}
