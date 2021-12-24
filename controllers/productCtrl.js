const Products = require('../models/productModel')

//Filter, sort and pagination, search
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

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            // console.log(req.query._id)
            // console.log(req.headers)
            // console.log(req.body)
            // console.log(req.params.id)
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, groupBuyPrice, buyNowPrice, description, content, images, brand, category, productType, vendorId, vendorCompany, vendorEmail, vendorMobile, groupBuyQty, totalQty, isActive, maxGroupBuys, successTarget } = req.body;
            if(!images) return res.status(400).json({ msg: 'Please add an image.. ' })

            const product = await Products.findOne({ product_id })
            if(product)
            return res.status(400).json({ msg: 'This product already exists.. ' })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), groupBuyPrice, buyNowPrice, description, content, images, brand, productType, category, vendorId, vendorCompany, vendorEmail, vendorMobile, groupBuyQty, totalQty, isActive, maxGroupBuys, successTarget
            })
            await newProduct.save()
            res.json({ msg: "New product created.. " })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Product Deleted.. "})
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, groupBuyPrice, buyNowPrice, description, content, images, brand, productType, category, groupBuyQty, totalQty, isActive, maxGroupBuys, successTarget  } = req.body;
            if(!images) return res.status(400).json({ msg: 'no image uploaded' })

            await Products.findByIdAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), groupBuyPrice, buyNowPrice, description, content, images, brand, productType, category, groupBuyQty, totalQty, isActive, maxGroupBuys, successTarget  
            })

            res.json({ msg: "Product updated.. " })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = productCtrl