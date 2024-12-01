const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const transferRoutes = require('./routes/transfers');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/banking_system');

app.use('/api/customers', customerRoutes);
app.use('/api/transfers', transferRoutes);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const open = await import('open');
  open.default(`http://localhost:${PORT}`);
});
