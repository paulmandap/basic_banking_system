const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Create a new customer (Create)
router.post('/', async (req, res) => {
  try {
    const { name, email, balance } = req.body;

    // Check if customer with the same email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newCustomer = new Customer({
      name,
      email,
      balance: balance || 0 // Default balance to 0 if not provided
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
});

// Get all customers (Read - already existing)
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

// Get a single customer (Read - already existing)
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
});

// Update a customer (Update)
router.put('/:id', async (req, res) => {
  try {
    const { name, email, balance } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Validate input
    if (email) {
      // Check if the new email is already in use by another customer
      const existingCustomer = await Customer.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Email is already in use by another customer' });
      }
    }

    // Update fields if provided
    if (name) customer.name = name;
    if (email) customer.email = email;
    if (balance !== undefined) customer.balance = balance;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
});

// Delete a customer (Delete)
router.delete('/:id', async (req, res) => {
  try {
    // Check if customer exists and has no transfers
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if customer has any transfers
    const transferCount = await require('../models/transfer').countDocuments({
      $or: [{ from: req.params.id }, { to: req.params.id }]
    });

    if (transferCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete customer with existing transfer history' 
      });
    }

    // Delete the customer
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ 
      message: 'Customer deleted successfully', 
      deletedCustomer 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
});

module.exports = router;