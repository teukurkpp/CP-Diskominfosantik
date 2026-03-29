const express = require('express');
const corsMiddleware = require('./middleware/cors');
const app = express();

app.use(corsMiddleware);

app.get('/test', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});