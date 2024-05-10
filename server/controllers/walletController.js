const User = require('../models/User')
const Wallet = require('../models/Wallet')
const { StatusCodes } = require('http-status-codes')
const { ObjectId } = require('mongodb')

exports.addBalance = async (req,res) => {
  const user = await User.findById(ObjectId(req.userId))
  const { emailOrContact, amount } = req.body
  let receiver

  if (user.role === 'admin' && emailOrContact) {
    receiver = await User.find({
      $or: [{ email: emailOrContact }, { contact: emailOrContact }],
    }).exec()
    if (receiver) {
      const receiverWallet = await Wallet.findOne({ user: receiver})
      await Wallet.updateOne(receiverWallet, {
        $set: { balance: receiverWallet.balance + amount },
      })
      res.status(StatusCodes.OK).json('Amount credited in user account')
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found'})
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'You are not authorized to do this action'})
  }

}