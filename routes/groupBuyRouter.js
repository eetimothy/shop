const router = require('express').Router()
const groupBuyCtrl = require('../controllers/groupBuyCtrl')
const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')
const authSuperAdmin = require('../middleware/authSuperAdmin')

router.route('/groupbuys')
    .get(groupBuyCtrl.getGroupBuys)
    .post(auth, groupBuyCtrl.createGroupBuy)
    
router.route('/add_user_group_buy')
    .patch(groupBuyCtrl.addUserToGroupBuy)

router.route('/groupbuys_product')
    .get(groupBuyCtrl.getProductGroupBuys)

router.route('/groupbuys_user')
    .get(auth, groupBuyCtrl.getAllGroupBuysOfUser)

router.route('/groupbuys_user_joined')
    .get(auth, groupBuyCtrl.getUserJoinedGroupBuys)


    

module.exports = router
