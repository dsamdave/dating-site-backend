const router = require('express').Router()
const authCtrl = require('../controllers/authCtrl')
const validateRegister = require('../middleware/validation')

router.post('/register', validateRegister, authCtrl.register)

router.post('/login', authCtrl.login)

router.get('/logout', authCtrl.logout)

router.get('/refresh_token', authCtrl.refreshToken)


module.exports = router