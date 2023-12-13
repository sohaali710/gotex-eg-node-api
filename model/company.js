const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        default: "gotex-eg"
    },
    userprice: {
        type: Number,
        default: 22,
    },
    kgprice: {
        type: Number,
        default: 22,
    },
    codprice: {
        type: Number,
        default: 10
    }
})
module.exports = mongoose.model("Company", companySchema);