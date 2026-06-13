const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});