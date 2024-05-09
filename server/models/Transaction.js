const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;