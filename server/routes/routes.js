const express = require('express')

const router = express.Router()

const { signup, login, logout } = require('../controllers/userController.js')

router.post('/sign_up', signup)
router.post('/log_in', login)

module.exports = router
