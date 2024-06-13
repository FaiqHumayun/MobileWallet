const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 100
  }
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;