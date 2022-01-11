const mongoose = require('mongoose')

const groupBuySchema = new mongoose.Schema({
    
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    product_id: {
        type: String,
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
    startUser: {
        type: String,
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
        type: String
    },
    category: {
        type: String,
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vendorCompany: {
        type: String,
        required: true
    },
    vendorUsername: {
        type: String,
        required: true,
    },
    vendorMobile: {
        type: String,
        required: true,
    },
    vendorEmail: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    buyers: {
        type: Number,
        default: 0
    },
    groupBuyQty: {
        type: mongoose.Schema.Types.Number,
        ref: "Product"
    },
    success: {
        type: Boolean,
        default: false
    },
    successTarget: {
        type: mongoose.Schema.Types.Number,
        ref: "Product"
    },
    endDate: {
        type: Date
    },
    // started: {
    //     type: Date,
    //     expires: 20
    // }
}, {
    timestamps: true,
})



module.exports = mongoose.model('GroupBuys', groupBuySchema)