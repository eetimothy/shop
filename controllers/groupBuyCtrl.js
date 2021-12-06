const GroupBuys = require('../models/groupBuyModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
        //console.info({before: queryObj}) //before delete page
        
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        //console.info({after: queryObj}) //after delete page
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //console.log({queryObj, queryStr})

        //gte -> greater than or equal
        //lte -> lesser than or equal
        //lt -> lesser than
        //gt -> greater than
        this.query.find(JSON.parse(queryStr))
        return this;
    }

    sorting(){
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            //console.log(sortBy)
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9  // page number, list 3 products
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const groupBuyCtrl = {
    getGroupBuys: async (req, res) => {
        try {
            // const GroupBuy = await GroupBuys.find()
            // res.json(GroupBuy)
            // console.log(GroupBuy)
            const features = new APIfeatures(GroupBuys.find(), req.query)
            .filtering().sorting().paginating()

            const groupBuys = await features.query

            res.json({
                status: 'success',
                result: groupBuys.length,
                groupBuys: groupBuys
            })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllGroupBuysOfUser: async (req, res) => {
        try {
            // const { vendorId } = req.query
            const features = new APIfeatures(GroupBuys.find(), req.query)
            .filtering().sorting().paginating()

            const userGroupBuys = await features.query

            res.json({
                status: 'success',
                result: userGroupBuys.length,
                userGroupBuys: userGroupBuys
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProductGroupBuyOfUser: async (req, res) => {

    },
    createGroupBuy: async (req, res) => {
        try {
            const { 
                product, startedBy, users, title, description, product_id,
                content, brand, productType, category, groupBuyPrice, vendorId, images, 
                isActive, groupBuyQty, buyers
            } = req.body

            // console.log(req.body)
            // const { email, _id } = startedBy
            const userSearch = await Users.findById(req.user.id)
            if(!userSearch) return res.status(400).json({ msg: "User does not exist.." })

            const newGroupBuy = new GroupBuys ({
                users, startedBy, product, title, description, product_id,
                content, brand, productType, category, groupBuyPrice, vendorId, images,
                isActive, groupBuyQty, buyers
            })

            await newGroupBuy.save()
            res.json({ msg: "New group buy created..."})
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    addUserToGroupBuy: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({ msg: "user does not exist.. "})
            // console.log(user)

            const { _id, quantity } = req.body
            // console.log(req.body.quantity)
            // console.log(req.user.id)
            const groupBuy = GroupBuys.findById(req.body._id)
            if(!groupBuy) return res.status(400).json({ msg: "group buy does not exist.. "})
            
            await GroupBuys.findOneAndUpdate({ _id: req.body._id }, {
                $inc: { groupBuyQty: - req.body.quantity }
            })

            await GroupBuys.findOneAndUpdate({ _id: req.body._id }, {
                $inc: { buyers: req.body.quantity }
            })
            
            // await GroupBuys.findOneAndUpdate({ _id: req.body._id}, {
            //     groupBuyQty: groupBuyQty - 1
            // })

            await GroupBuys.findOneAndUpdate({ _id: req.body._id }, { 
                $push: { users: [{ id: req.user.id, quantity: req.body.quantity }] }
                })
                return res.json({ msg: "user added to groupbuy" })
            }

        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

}



module.exports = groupBuyCtrl