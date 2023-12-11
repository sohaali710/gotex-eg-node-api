const axios = require("axios");
const User = require("../model/user");
const sendEmail = require("../modules/sendEmail");
const balanceAlertMailSubject = "Alert! Your wallet balance is less than 100 SAR."

exports.createOrder = async (req, res) => {
    const pickup = req.query.pickup || true // true (default) -> pickup order | false -> last mile
    const {
        p_name, p_city, p_mobile, p_streetaddress,
        c_name, c_city, c_mobile, c_streetaddress,
        weight, quantity, cod, description, userId } = req.body

    const totalShipPrice = res.locals.totalShipPrice;
    const cashondelivery = res.locals.codAmount;

    const user = await User.findById(userId);
    let ordersNum = await SaeeOrder.count();

    try {
        const paytype = cod ? "cod" : "cc";

        const order = await SaeeOrder.create({
            user: userId,
            company: "saee",
            ordernumber: `${ordersNum + "/" + Date.now() + "gotex"}`,
            paytype,
            price: totalShipPrice,
            codPrice: res.locals.codAmount,
            created_at: new Date()
        })

        if (!response.data.success) {
            order.status = 'failed'
            await order.save()
            return res.status(400).json({ msg: response.data })
        }

        if (!cod) {
            user.wallet = user.wallet - totalShipPrice
            if (user.wallet <= 100 && !user.isSentBalanceAlert) {
                sendEmail(user.email, "", "", "/../views/balanceAlert.ejs", balanceAlertMailSubject)
                user.isSentBalanceAlert = true
                await user.save()
            }
            await user.save()
        }

        res.status(200).json({ msg: "Order created successfully", data: order })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err.message
        })
    }
}

exports.getUserOrders = async (req, res) => {
    const userId = req.body.userId;
    SaeeOrder.find({ user: userId, status: { $ne: "failed" } })
        .then(o => {
            res.status(200).json({
                data: o
            })
        })
        .catch(err => {
            console.log(err.request)
        })
}