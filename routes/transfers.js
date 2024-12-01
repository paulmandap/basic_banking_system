const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Transfer = require('../models/transfer');

// Create a transfer
router.post('/', async (req, res) => {
  const { from, to, amount } = req.body;
  const fromCustomer = await Customer.findById(from);
  const toCustomer = await Customer.findById(to);

  if (fromCustomer.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  fromCustomer.balance -= amount;
  toCustomer.balance += amount;

  await fromCustomer.save();
  await toCustomer.save();

  const transfer = new Transfer({ from, to, amount });
  await transfer.save();

  res.json({ message: 'Transfer successful' });
});

// Get all transfers
router.get('/', async (req, res) => {
  const transfers = await Transfer.find().populate('from').populate('to');
  res.json(transfers);
});

module.exports = router;
