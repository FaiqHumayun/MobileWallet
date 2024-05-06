const User = require('../models/User')
require('dotenv').config()
const { MESSAGES } = require('../constants/api.constant')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
  try {
    const { email, password, name, cnic, address, role, contact } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
      res.send({ status: MESSAGES.FAILED, message: MESSAGES.ALREADY_EXIST })
    } else {
      if (name && email && password && cnic && address && contact && role)
        try {
          const user = await User.create({
            email,
            password,
            name,
            cnic,
            address,
            role,
            contact,
          })
          if (user) {
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
              expiresIn: MESSAGES.EXPIRE_IN,
            })
            res.status(StatusCodes.CREATED).send({
              status: MESSAGES.SUCCESS,
              message: MESSAGES.REGISTER,
              token: token,
              user,
            })
          }
        } catch (error) {
          res.send({ status: MESSAGES.FAILED, message: error.message })
        }
      else {
        res.send({
          status: MESSAGES.FAILED,
          message: MESSAGES.REQUIRED_ALL_FIELDS,
        })
      }
    }
  } catch (error) {
    res.send({ status: MESSAGES.FAILED, message: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (email && password) {
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (user.email === email && passwordMatch) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '5d',
          })
          res.send({
            status: MESSAGES.SUCCESS,
            message: MESSAGES.LOGIN,
            token: token,
            user,
          })
        } else {
          res.send({
            status: MESSAGES.FAILED,
            message: MESSAGES.INVALID,
          })
        }
      } else {
        res.send({
          status: MESSAGES.FAILED,
          message: MESSAGES.NOT_REGISTERED,
        })
      }
    } else {
      res.send({
        status: MESSAGES.FAILED,
        message: MESSAGES.REQUIRED_ALL_FIELDS,
      })
    }
  } catch (error) {
    res.send({ status: MESSAGES.FAILED, message: error.message })
  }
}

exports.logout = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (email && password) {
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (user.email === email && passwordMatch) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '5d',
          })
          res.send({
            status: MESSAGES.SUCCESS,
            message: MESSAGES.LOGIN,
            token: token,
            user,
          })
        } else {
          res.send({
            status: MESSAGES.FAILED,
            message: MESSAGES.INVALID,
          })
        }
      } else {
        res.send({
          status: MESSAGES.FAILED,
          message: MESSAGES.NOT_REGISTERED,
        })
      }
    } else {
      res.send({
        status: MESSAGES.FAILED,
        message: MESSAGES.REQUIRED_ALL_FIELDS,
      })
    }
  } catch (error) {
    res.send({ status: MESSAGES.FAILED, message: error.message })
  }
}
