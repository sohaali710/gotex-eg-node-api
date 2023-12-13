const axios = require("axios");
const User = require("../../model/user");
const Company = require("../../model/company");
const Order = require("../../model/orders/order");
const sendEmail = require("../../modules/sendEmail");
const balanceAlertMailSubject = "Alert! Your wallet balance is less than 100 SAR."

exports.createOrder = async (req, res) => {
    const {
        p_name, p_email = '', p_city, p_address, p_mobile,
        c_name, c_email = '', c_city, c_address, c_mobile,
        weight, quantity, description = '', cod, userId } = req.body

    const totalShipPrice = res.locals.totalShipPrice;
    const cashondelivery = res.locals.codAmount;

    const user = await User.findById(userId);
    let ordersNum = await Company.count();

    try {
        const paytype = cod ? "cod" : "cc";

        const order = await Order.create({
            user: userId,
            ordernumber: `${ordersNum + "/" + Date.now() + "gotex"}`,
            paytype,
            price: totalShipPrice,
            codPrice: res.locals.codAmount,
            created_at: new Date(),

            p_name,
            p_email,
            p_city,
            p_address,
            p_mobile,

            c_name,
            c_email,
            c_city,
            c_address,
            c_mobile,

            weight,
            quantity,
            description,
        })

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
    Order.find({ user: userId })
        .then(o => {
            res.status(200).json({
                data: o
            })
        })
        .catch(err => {
            console.log(err.request)
        })
}