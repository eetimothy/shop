const router = require('express').Router()
const vendorCtrl = require('../controllers/vendorCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/vendorbrands')
    .get(vendorCtrl.getVendorBrands)
    
router.route('/vendorproducts')
    .get(vendorCtrl.getVendorProducts)

router.route('/shops')
    .get(vendorCtrl.getShops)

module.exports = router