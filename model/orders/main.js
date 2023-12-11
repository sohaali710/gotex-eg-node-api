const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: String,
    ordernumber: String,
    paytype: String,
    price: Number,
    codPrice: Number,
    marktercode: String,
    created_at: Date,
    inovicedaftra: Object,
    status: {
        type: String,
        enum: ['failed', 'pending', 'accepted', 'canceled'],
        default: 'pending'
    }

    p_name, p_city, p_mobile, p_streetaddress,
    c_name, c_city, c_mobile, c_streetaddress,
    weight, quantity, cod, description
})

module.exports = mongoose.model("Order", orderSchema);