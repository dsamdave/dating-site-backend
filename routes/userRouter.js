const express = require("express")
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")


const router = express.Router()

router.get('/users', auth, userCtrl.getUsers)

router.get('/user/:id', auth, userCtrl.getUser)

router.patch('/user/:id/like', auth, userCtrl.like)
router.patch('/user/:id/dilike', auth, userCtrl.dislike)



module.exports = router