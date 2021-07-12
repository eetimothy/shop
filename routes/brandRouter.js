const router = require('express').Router()
const brandCtrl = require('../controllers/brandCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/brand')
    .get(brandCtrl.getBrands)
    .post (auth, authAdmin, brandCtrl.createBrand)

router.route('/brand/:id')
    .delete(auth, authAdmin, brandCtrl.deleteBrand)
    .put(auth, authAdmin, brandCtrl.updateBrand)



module.exports = router