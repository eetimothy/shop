const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')
const GroupBuys = require('../models/groupBuyModel')

const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('username email')
            if(!user) return res.status(400).json({ msg: "User does not exist.." })

            const { cart, paymentID, address } = req.body;
            const { _id, username, email, vendorId } = user;
            
            const newPayment = new Payments({
                user_id: _id, username, email, cart, paymentID, address, vendorId
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            //update the total instock in Products DB
            cart.filter(item => {
                return totalQty(item._id, item.quantity, item.totalQty)
            })

            //update the available groupbuys allowed in Products DB
            cart.filter(item => {
                return maxGroupBuys(item._id, item.maxGroupBuys)
            })

            //update the number of running group buys in Products DB
            cart.filter(item => {
                return currentGroupBuys(item._id, item.currentGroupBuys)
            })
            // console.log(newPayment)
            await newPayment.save()
            res.json({ msg: "Payment Success!" })


        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPayment_joinGroupBuy: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('username email')
            if(!user) return res.status(400).json({ msg: "User does not exist.." })

            const { groupBuyCart, paymentID, address } = req.body;
            const { _id, username, email, vendorId } = user;

          
            
            const newPayment = new Payments({
                user_id: _id, username, email, groupBuyCart, paymentID, address, vendorId
            })

            groupBuyCart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            //update the total instock in Products DB
            groupBuyCart.filter(item => {
                return totalQty(item._id, item.quantity, item.totalQty)
            })

            
            console.log(newPayment)
            await newPayment.save()
            res.json({ msg: "Payment Success!" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getVendorPayments: async (req, res) => {
        try {
            const payments = await Payments.find({ "cart": { $elemMatch: { vendorId: req.user.id } } })
            res.json(payments)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({ _id: id }, {
        sold: quantity + oldSold
    })
}

//update the total instock on GB creation
const totalQty = async (id, quantity, oldTotalQty) => {
    await Products.findOneAndUpdate({ _id: id }, {
        totalQty: oldTotalQty - quantity
    })
}

 //update the number of running group buys on GB creation
const currentGroupBuys = async (id, oldCurrentGroupBuys) => {
    await Products.findByIdAndUpdate({ _id: id }, {
        currentGroupBuys: oldCurrentGroupBuys + 1
    })
}

//update the available groupbuys allowed on new GB creation
const maxGroupBuys = async (id, oldMaxGroupBuys) => {
    await Products.findOneAndUpdate({ _id: id }, {
        maxGroupBuys: oldMaxGroupBuys - 1
    })
}

//add 1 more buyer to GroupBuys: {buyers:  }





module.exports = paymentCtrl