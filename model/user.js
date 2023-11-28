const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    address: String,
    location: String,
    emailCode: String,
    roll: {
        type: String,
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false
    },
    wallet: {
        type: Number,
        default: 0
    },
    cr: [String],
    isCrProofed: {
        type: Boolean,
        default: false
    },
    inv: {
        type: ObjectID,
        ref: 'Invitation'
    },
    daftraId: String,
    apikey: {
        test: String,
        production: String
    },
    apistatus: {
        test: {
            type: Boolean,
            default: false
        },
        production: {
            type: Boolean,
            default: false
        }
    },
    isSentBalanceAlert: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", userSchema);