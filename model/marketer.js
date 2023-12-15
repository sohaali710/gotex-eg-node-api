const mongoose = require("mongoose");

const marketerSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    mobile: String,
    code: String
})

module.exports = mongoose.model("Marketer", marketerSchema);