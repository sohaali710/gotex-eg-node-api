const jwt = require("jsonwebtoken");
const User = require("../model/user");
// const AnwanOrders = require("../model/orders/anwanOrders");
// const AramexOrders = require("../model/orders/aramexOrders");
// const GltOrders = require("../model/orders/gltOrders");
// const ImileOrders = require("../model/orders/imileOrders");
// const JtOrders = require("../model/orders/jtOrders");
// const SaeeOrders = require("../model/orders/saeeOrders");
// const SmsaOrders = require("../model/orders/smsaOrders");
// const SplOrders = require("../model/orders/splOrders");
// const Anwan = require("../model/companies/anwan");
// const Aramex = require("../model/companies/aramex");
// const Glt = require("../model/companies/glt");
// const Imile = require("../model/companies/imile");
// const Jt = require("../model/companies/jt");
// const Saee = require("../model/companies/saee");
// const Smsa = require("../model/companies/smsa");
// const Spl = require("../model/companies/spl");


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

/**
 * @Desc : User CRUD
 */
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
// /**
//  * @Desc : Companies CRUD
//  */
// exports.getAllCompanies = async (req, res) => {
//     try {
//         const anwan = await Anwan.findOne();
//         const aramex = await Aramex.findOne();
//         const glt = await Glt.findOne();
//         const imile = await Imile.findOne();
//         const jt = await Jt.findOne();
//         const saee = await Saee.findOne();
//         const smsa = await Smsa.findOne();
//         const spl = await Spl.findOne();

//         let companies = [aramex, anwan, glt, imile, jt, saee, smsa, spl];
//         res.status(200).json({ data: { companies } })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             msg: "server error",
//             error: err.message
//         })
//     }
// }
// /**
//  * @Desc : Orders CRUD
//  */
// exports.getAllOrders = async (req, res) => {
//     try {
//         const anwanOrders = await AnwanOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const aramexOrders = await AramexOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const gltOrders = await GltOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const imileOrders = await ImileOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const jtOrders = await JtOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const saeeOrders = await SaeeOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const smsaOrders = await SmsaOrders.find({ status: { $ne: "failed" } }).populate("user");
//         const splOrders = await SplOrders.find({ status: { $ne: "failed" } }).populate("user");

//         let orders = [...anwanOrders, ...aramexOrders, ...gltOrders, ...imileOrders, ...jtOrders, ...saeeOrders, ...smsaOrders, ...splOrders];
//         res.status(200).json({ data: { orders } })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             msg: "server error",
//             error: err.message
//         })
//     }

// }
