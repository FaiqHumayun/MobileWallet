const express = require('express')

const router = express.Router()

const {
  signup,
  login,
  editProfile,
} = require('../controllers/userController.js')

const {
  authenticateUser
} = require('../middlewares/auth.js')

const {
  createtransaction
} = require('../controllers/transactionController.js')

router.post('/sign_up', signup)
router.post('/log_in', login)
router.patch('/editprofile/:user_id', editProfile)
router.post('/transactions', authenticateUser, createtransaction)

module.exports = router
