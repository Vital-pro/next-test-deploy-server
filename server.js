require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/news', (req, res) => {
  res.json({
    temp: 30,
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server has started!... On port: http://localhost:${
      process.env.PORT || 3001
    }`
  );
});
