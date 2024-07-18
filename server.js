require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const cheerio = require('cheerio');

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

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

app.get('/password/', (req, res) => {
  if (req.query.password === process.env.PASSWORD) {
    res.sendFile('./public/index1.html', { root: __dirname })
  } else {
    res.json({
      authorized: 'Bad Request',
    });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server has started!... On port: http://localhost:${
      process.env.PORT || 3001
    }`
  );
});
