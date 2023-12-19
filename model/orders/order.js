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
    p_mobile: String,

    c_name: String,
    c_email: String,
    c_city: String,
    c_address: String,
    c_mobile: String,

    weight: Number,
    quantity: Number,
    description: String,
    status: {
        type: String,
        enum: ['failed', 'pending', 'confirmed', 'canceled'],
        default: 'pending'
    },
    bill: String,
    marketerCode: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model("Order", orderSchema);