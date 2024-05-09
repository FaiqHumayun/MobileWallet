const User = require('../models/User')
const Friends = require('../models/Friends')
const { StatusCodes } = require('http-status-codes')
const { ObjectId } = require('mongodb')

exports.addFriend = async (req, res) => {
  try {
    const { nickname, email, contact } = req.body
    const maker = await User.findById(ObjectId(req.userId))
    if (!maker) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'You are not a authorized user.' })
    }
    let friend
    if (email) {
      friend = await User.findOne({ email: email })
      await Friends.find({ maker: maker, friend_email: email }).exec(
        async (err, result) => {
          if (result.length > 0) {
            let friends = await Friends.find({ maker: maker }).exec()
            res.json({ message: 'Already a friend', friends })
          } else {
            await Friends.create({
              nickname: nickname,
              maker: maker,
              friend_email: email,
            })

            let friends = await Friends.find({ maker: maker }).exec()
            res
              .status(StatusCodes.CREATED)
              .json({ message: 'Friend created successfully', friends })
          }
        }
      )
    } else if (contact) {
      friend = await User.findOne({ contact: contact })
      await Friends.find({ maker: maker, friend_contact: contact }).exec(
        async (err, result) => {
          if (result.length > 0) {
            let friends = await Friends.find({ maker: maker }).exec()
            res.json({ message: 'Already a friend', friends })
          } else {
            await Friends.create({
              nickname: nickname,
              maker: maker,
              friend_contact: contact,
            })

            let friends = await Friends.find({ maker: maker }).exec()
            res
              .status(StatusCodes.CREATED)
              .json({ message: 'Friend created successfully', friends })
          }
        }
      )
    } else {
      return res.json({ message: 'Friend not found' })
    }
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Friend cannot be created' })
  }
}
