const router = require('express').Router()
const productTypeCtrl = require('../controllers/productTypeCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/product_type')
    .get(productTypeCtrl.getProductTypes)
    .post (auth, authAdmin, productTypeCtrl.createProductType)

router.route('/product_type/:id')
    .delete(auth, authAdmin, productTypeCtrl.deleteProductType)
    .put(auth, authAdmin, productTypeCtrl.updateProductType)

module.exports = router