const User = require('../models/User')
const Wallet = require('../models/Wallet')
require('dotenv').config()
const { MESSAGES } = require('../constants/api.constant')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')

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
          const wallet = await Wallet.findOne({ user: user.id })
          if (user) {
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
              expiresIn: MESSAGES.EXPIRE_IN,
            })
            res.status(StatusCodes.CREATED).send({
              status: MESSAGES.SUCCESS,
              message: MESSAGES.REGISTER,
              token: token,
              user,
              wallet,
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
    const wallet = await Wallet.findOne({ user: user.id })
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
            wallet,
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

exports.editProfile = async (req, res) => {
  try {
    const id = req.params.user_id
    let user = await User.find(ObjectId(id))
    const { name, cnic, contact, address } = req.body
    if (user) {
      var myquery = { _id: ObjectId(id) }
      var newvalues = {
        $set: { name: name, address: address, contact: contact, cnic: cnic },
      }
      User.updateOne(myquery, newvalues, function (err, result) {
        if (err) throw err
        User.findOne(ObjectId(id), function (err, user) {
          if (err) {
            return res
              .status(500)
              .json({ status: MESSAGES.ERROR, message: err.message })
          }
          res
            .status(201)
            .json({ status: MESSAGES.SUCCESS, message: MESSAGES.UPDATED, user })
        })
      })
    } else {
      res.send({
        status: MESSAGES.FAILED,
      })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
