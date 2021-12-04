const mongoose = require('mongoose')

const groupBuySchema = new mongoose.Schema({
    
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    users: {
        type: Array,
        default: []
    },
    startedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // maxGroupBuysAllowed: {
    //     type: mongoose.Schema.Types.Number,
    //     ref: "Product"
    // },
    buyers: {
        type: Number,
        default: 0
    },
    groupBuyQty: {
        type: mongoose.Schema.Types.Number,
        ref: "Product"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('GroupBuys', groupBuySchema)