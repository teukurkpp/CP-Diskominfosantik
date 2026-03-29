const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5174', // Ganti dengan URL frontend
  credentials: true, // Izinkan pengiriman cookie
};

module.exports = cors(corsOptions);
