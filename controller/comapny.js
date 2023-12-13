const Company = require("../model/company");

exports.getCompany = async (req, res) => {
    try {
        const company = await Company.findOne()

        res.status(200).json({ data: company })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: err.message
        })
    }
}
exports.edit = async (req, res) => {
    const { userprice, userCodPrice, kgprice } = req.body

    try {
        let company = await Company.findOne()

        if (company) {
            company.userprice = userprice;
            company.kgprice = kgprice;
            company.codprice = userCodPrice
            await company.save()
        } else {
            company = await Company.create({
                userprice,
                kgprice,
                codprice: userCodPrice
            })
        }

        res.status(200).json({ msg: "ok" })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: err.message
        })
    }
}