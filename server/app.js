const express = require('express');
const app = express();
const port = 8800; // You can choose a different port if you prefer

app.get('/', (req, res) => {
  res.send('Welcome to Goa, Singham');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
