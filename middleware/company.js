const User = require("../model/user");

exports.checkCompany = (CompanyModel) => {
    return (
        async (req, res, next) => {
            let { userId, cod, weight, shipmentValue } = req.body
            // const roll = "user"

            try {
                const company = await CompanyModel.findOne();
                const user = await User.findById(userId)
                if (!user) {
                    return res.status(400).json({ msg: "error this user doesn't exist" })
                }

                let weightPrice = weight <= 15 ? 0 : (weight - 15) * company.kgprice;

                if (cod) {
                    if (!shipmentValue) shipmentValue = 0;
                    var shipPrice = company.codprice;

                    res.locals.codAmount = shipPrice + weightPrice + shipmentValue; // 10 + (25 - 15)22 + 100
                    res.locals.totalShipPrice = shipPrice + weightPrice;

                    next()
                } else {
                    var shipPrice = company.userprice;

                    /** allow to make orders as long as the wallet balance is >= -5000 + order price */
                    if (user.wallet <= (shipPrice + weightPrice - 5000)) {
                        return res.status(400).json({ msg: "Your wallet balance is not enough to make the shipment." })
                    }
                    res.locals.codAmount = 0;
                    res.locals.totalShipPrice = shipPrice + weightPrice;

                    next()
                }
            } catch (err) {
                console.log(err)
                res.status(500).json({
                    error: err.message
                })
            }
        }
    )
}

exports.isCrProofed = (req, res, next) => {
    const userId = req.body.userId

    User.findById(userId)
        .then(u => {
            if (u.roll == "user" || u.isCrProofed == true) {
                return next()
            }
            return res.status(400).json({
                msg: "The commercial registry must be documented to make shipments to this company"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err.message
            })
        })
}