const Brand = require('../models/brandModel')
const Products = require('../models/productModel')

const brandCtrl = {
    getBrands: async (req, res) => {
        try {
            const brands = await Brand.find()
            res.json(brands)
            // console.log(brands)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createBrand: async (req, res) => {
        try {
            //if user role = 1 --> is admin
            //only admin can CRUD category
            const { name, user } = req.body
            const brand = await Brand.findOne({name})
            if(brand) return res.status(400).json({ msg: "This brand already exist." })

            const newBrand = new Brand({ name, user })

            await newBrand.save()
            res.json({ msg: "New brand created..."})
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    deleteBrand: async (req, res) => {
        try {
            //prevent accidental deletion of categories
            const products = await Products.findOne({ brand: req.params.id })
            if(products) return res.status(400).json({ 
                msg: "Unable to delete Brand yet.. Please delete all related products first.." 
            })

            await Brand.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted brand.." })
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    updateBrand: async (req, res) => {
        try {
            const { name } = req.body;
            await Brand.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated brand" })
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = brandCtrl
