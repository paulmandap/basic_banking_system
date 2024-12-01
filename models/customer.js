const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  balance: Number
});

module.exports = mongoose.model('Customer', customerSchema);
