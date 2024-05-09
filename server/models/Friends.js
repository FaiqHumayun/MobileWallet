const mongoose = require('mongoose')

const Schema = mongoose.Schema

const friendsSchema = new Schema({
  nickname: {
    type: String,
    default: null
  },
  maker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend_email: {
    type: String,
  },
  friend_contact: {
    type: String,
  },
})


const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;