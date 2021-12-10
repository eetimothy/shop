const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    groupBuyPrice: {
        type: Number,
        trim: true,
        required: true
    },
    buyNowPrice: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    },
    maxGroupBuys: {
        type: Number,
        default: 0
    },
    groupBuyQty: {
        type: Number,
        default: 0,
        required: true
    },
    totalQty: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    currentGroupBuys: {
        type: Number,
        default: 0
    },
    successTarget: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Products', productSchema)