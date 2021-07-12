const Brand = require('../models/brandModel')
const Products = require('../models/productModel')

//Filter, sort and pagination
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

const vendorCtrl = {
    getVendorBrands: async (req, res) => {
        try {
            const { user } = req.query
            const brands = await Brand.find({ user })
            res.json(brands)
            // console.log(brands)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    // getVendorProducts: async (req, res) => {
    //     try {
    //         // console.log(req.query)
    //         // console.log(req.query._id)
    //         // console.log(req.headers)
    //         // console.log(req.body)
    //         // console.log(req.params.id)
    //         const { user } = req.query
    //         const features = await Products.find({ user })
    //         res.json(features)
    //         // console.log(features)
    //     }
    //     catch (err) {
    //         return res.status(500).json({ msg: err.message })
    //     }
    // }
    getVendorProducts: async (req, res) => {
        try {
            const { user } = req.query
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const vendorProducts = await features.query

            res.json({
                status: 'success',
                result: vendorProducts.length,
                vendorProducts: vendorProducts
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = vendorCtrl