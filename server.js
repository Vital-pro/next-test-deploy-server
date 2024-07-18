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
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const checkPassword = (req, res, next) => {
//   if (req.query.password !== process.env.PASSWORD) {
//     res.json({
//       authorized: 'Bad Request',
//     });
//     return;
//   } else {
//     next();
//   }
// };

async function getData() {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
  const data = await response.json();
  app.locals.data = data.message;
  console.log(data);
  return app.locals.data;
}

app.get('/api/first',async (req, res) => {
  cron.schedule('* * * * *', getData)
  // const data = await getData();
  res.send('Hello World!');
});

app.get('/api/news', async (req, res) => {
  // const data = app.locals.data;
  // console.log(data)
  res.json({
    message: app.locals.data,
  });
});

// app.get('/api/password', checkPassword, (req, res) => {
//   if (req.query.password === process.env.PASSWORD) {
//   res.sendFile('./public/index1.html', { root: __dirname });
//   } else {
//   res.json({
//     authorized: 'Bad Request',
//   });
//   }
// });

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server has started!... On port: http://localhost:${
      process.env.PORT || 3001
    }`
  );
});
