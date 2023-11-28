const jwt = require("jsonwebtoken");

exports.isAdminAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({
            msg: "token is required"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        console.log(user)
        if (err) {
            return res.status(400).json({
                msg: err
            })
        }
        if (user.data.user.roll == 'admin') {
            req.user = user.data
            next();
        } else {
            res.status(304).json({
                msg: "not allowed"
            })
        }
    })
}
