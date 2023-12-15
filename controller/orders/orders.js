const axios = require("axios");
const User = require("../../model/user");
const Company = require("../../model/company");
const Order = require("../../model/orders/order");
const sendEmail = require("../../modules/sendEmail");
const paginate = require("../../modules/paginate");
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

exports.confirmOrder = async (req, res) => {
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