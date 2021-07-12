const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authSuperAdmin = require('../middleware/authSuperAdmin')

router.post('/account/register', userCtrl.register)

router.post('/account/activate', userCtrl.activateEmail)

router.post('/account/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.post('/account/forgot_password', userCtrl.forgotPassword)

router.post('/account/reset_password', auth, userCtrl.resetPassword)

router.get('/info', auth, userCtrl.getUser)

router.get('/all_users_info', auth, authSuperAdmin, userCtrl.getAllUsersInfo)

router.patch('/account/update_user_details', auth, userCtrl.updateUser)

router.patch('/account/update_user_permission/:id', auth, authSuperAdmin, userCtrl.updateUserPermission)

router.delete('/account/delete/:id', auth, authSuperAdmin, userCtrl.deleteUser)

router.patch('/addcart', auth, userCtrl.addCart)

router.get('/orderhistory', auth, userCtrl.history)

module.exports = router;