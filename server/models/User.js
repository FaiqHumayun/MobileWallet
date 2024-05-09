const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Wallet = require('./Wallet');

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
})

userSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(this.password, 10)

  this.password = hash
  next()
})

userSchema.post('save', async function (doc) {
  try {
    await Wallet.create({ user: doc._id });
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

const User = mongoose.model('User', userSchema)

module.exports = User
