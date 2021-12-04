const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    groupBuyCart: {
        type: Array,
        default: []
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Payments", paymentSchema)