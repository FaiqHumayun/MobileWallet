const User = require('../models/User')
const Wallet = require('../models/Wallet')
const Transaction = require('../models/Transaction')
const { MESSAGES } = require('../constants/api.constant')
const { StatusCodes } = require('http-status-codes')
const { ObjectId } = require('mongodb')

exports.createtransaction = async (req, res) => {
  try {
    const { receiver_email, receiver_contact, amount, purpose } = req.body

    const sender = await User.findById(ObjectId(req.userId))
    if (!sender) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid sender.' })
    }

    let receiver
    if (receiver_email) {
      receiver = await User.findOne({ email: receiver_email })
    } else if (receiver_contact) {
      receiver = await User.findOne({ contact: receiver_contact })
    } else {
      return res.json({ message: 'Receiver email or contact is required.' })
    }

    if (!receiver) {
      return res.json({ message: 'Receiver not found.' })
    }

    let senderWallet = await Wallet.findOne({ user: sender.id })
    const receiverWallet = await Wallet.findOne({ user: receiver.id })
    if (!senderWallet) {
      return res.json({ message: 'Sender wallet not found.' })
    }
    if (!receiverWallet) {
      return res.json({ message: 'Receiver wallet not found.' })
    }

    if (senderWallet.balance < amount) {
      return res.json({ message: 'Insufficient balance.' })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await Transaction.aggregate([
      {
        $match: {
          sender: ObjectId(sender.id),
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: '$sender',
          totalAmountSent: { $sum: '$amount' },
        },
      },
    ]).exec(async (err, result) => {
      if (err) {
        console.error('Error retrieving amount sent:', err)
        return
      } else {
        if (result.length > 0 && result[0]?.totalAmountSent + amount > 25000) {
          await Wallet.updateOne(receiverWallet, {
            $set: { balance: receiverWallet.balance + amount },
          })
          await Wallet.updateOne(senderWallet, {
            $set: { balance: senderWallet.balance - amount - 200 },
          })
        } else {
          await Wallet.updateOne(receiverWallet, {
            $set: { balance: receiverWallet.balance + amount },
          })
          await Wallet.updateOne(senderWallet, {
            $set: { balance: senderWallet.balance - amount },
          })
        }
        await Transaction.create({
          sender: sender._id,
          receiver: receiver._id,
          amount,
          purpose,
          createdAt: today,
        })

        const wallet = await Wallet.findById(senderWallet.id)

        res.status(StatusCodes.CREATED).json({
          message: 'Transaction completed successfully.',
          wallet
        })
      }
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Request not completed.' })
  }
}
