const express = require('express')

const router = express.Router()

const {
  signup,
  login,
  editProfile,
} = require('../controllers/userController.js')

const { authenticateUser } = require('../middlewares/auth.js')

const { createtransaction, fetchHistory } = require('../controllers/transactionController.js')

const {
  addFriend,
} = require('../controllers/friendsController.js')

const { addBalance } = require('../controllers/walletController.js')

router.post('/sign_up', signup)
router.post('/log_in', login)
router.patch('/editprofile/:user_id', editProfile)
router.post('/transactions', authenticateUser, createtransaction)
router.get('/transactions', authenticateUser, fetchHistory)
router.post('/add_friend', authenticateUser, addFriend)
router.post('/add_balance', authenticateUser, addBalance)

module.exports = router
