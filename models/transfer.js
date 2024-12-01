const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transfer', transferSchema);
