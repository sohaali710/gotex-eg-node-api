const jwt = require("jsonwebtoken");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

exports.isAdminOrMarketer = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(400).json({
                msg: err
            })
        }
        if (user.data.user.roll == 'marketer' || user.data.user.roll == 'admin') {
            req.user = user.data
            next();
        } else {
            res.status(405).json({
                msg: "not allowed"
            })
        }
    })
}