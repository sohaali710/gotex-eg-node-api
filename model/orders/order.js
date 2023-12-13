const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ordernumber: String,
    paytype: String,
    price: Number,
    codPrice: Number,
    created_at: Date,

    p_name: String,
    p_email: String,
    p_city: String,
    p_address: String,
    p_mobile: Number,

    c_name: String,
    c_email: String,
    c_city: String,
    c_address: String,
    c_mobile: Number,

    weight: Number,
    quantity: Number,
    description: String,
    status: {
        type: String,
        enum: ['failed', 'pending', 'accepted', 'canceled'],
        default: 'pending'
    }
})

module.exports = mongoose.model("Order", orderSchema);