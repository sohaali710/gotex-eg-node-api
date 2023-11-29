const data = require('../eg-cities.json')

exports.getEgCities = async (req, res) => {
    try {
        console.log(data)
        res.status(200).json({ data })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "server error",
            error: err.message
        })
    }
}