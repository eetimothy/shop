const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    company: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        minlength: 8
    },
    account_type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)