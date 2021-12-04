const router = require('express').Router()
const paymentCtrl = require('../controllers/paymentCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)

router.route('/vendorPayments')
    .get(auth, authAdmin, paymentCtrl.getVendorPayments)
  
router.route('/payment_join_groupbuy')
    .post(auth, paymentCtrl.createPayment_joinGroupBuy)
  
module.exports = router
