const express = require('express');


const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('This is about!');
});


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});