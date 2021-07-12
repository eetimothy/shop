const ProductType = require('../models/productTypeModel')
const Products = require('../models/productModel')

const productTypeCtrl = {
    getProductTypes: async (req, res) => {
        try {
            const productTypes = await ProductType.find()
            res.json(productTypes)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProductType: async (req, res) => {
        try {
            //if user role = 1 --> is admin
            //only admin can CRUD category
            const { name } = req.body
            const productType = await ProductType.findOne({ name })
            if(productType) return res.status(400).json({ msg: "This product type already exist." })

            const newProductType = new ProductType({ name })

            await newProductType.save()
            res.json({ msg: "New product type created..."})
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    deleteProductType: async (req, res) => {
        try {
            //prevent accidental deletion of categories
            const products = await Products.findOne({ productType: req.params.id })
            if(products) return res.status(400).json({ 
                msg: "Unable to delete Product Type yet.. Please delete all related products first.." 
            })

            await ProductType.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted product Type.." })
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    updateProductType: async (req, res) => {
        try {
            const { name } = req.body;
            await ProductType.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated product type.. " })
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = productTypeCtrl