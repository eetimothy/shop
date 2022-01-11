const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        default: "https://res.cloudinary.com/dqvsmpqar/image/upload/v1641891015/test/xrzyguw8owcaxpuccjcr.jpg"
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
        defaut: 0
    },
    cart: {
        type: Array,
        default: []
    },
    groupBuyCart: {
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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)