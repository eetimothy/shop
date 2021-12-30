const router = require('express').Router()
const enquiryCtrl = require('../controllers/enquiryCtrl')

router.route('/contact')
    .post(enquiryCtrl.enquiry)



module.exports = router