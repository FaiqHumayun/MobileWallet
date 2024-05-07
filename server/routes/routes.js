const express = require('express')

const router = express.Router()

const {
  signup,
  login,
  editProfile,
} = require('../controllers/userController.js')

router.post('/sign_up', signup)
router.post('/log_in', login)
router.patch('/editprofile/:user_id', editProfile)

module.exports = router
