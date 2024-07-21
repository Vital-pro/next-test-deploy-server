require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const cheerio = require('cheerio');
const fs = require('fs');

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
  const date = String(new Date());
  fs.appendFile('datelog.txt', `\n${date}`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
  app.locals.data = data.message;
  console.log(data);
  return app.locals.data;
}

app.get('/api/first', async (req, res) => {
  await getData();
  // cron.schedule('32-37,41-47 * * * *', getData)
  res.send('Hello World!');
});

app.get('/api/news', async (req, res) => {
  // const data = app.locals.data;
  // console.log(data)
  res.json({
    message: app.locals.data,
  });
});

app.get('/api/clock', async (req, res) => {
  await getData();
  startScheduleTasks();
  res.send('Clock!')
})

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

//! *****My START***********************************
function startScheduleTasks() {
  const now = new Date();
  const dayOfWeek = new Date().getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (dayOfWeek === 6) {
    cron.schedule('11-13,22-24 * * * *', getData);
  }
  if (dayOfWeek === 0 && currentHour >= 11 && currentHour < 12) {
    cron.schedule('31-33,50-52 * * * *', getData);
  }
  if (dayOfWeek === 0 && currentHour >= 12 && currentHour < 13) {
    cron.schedule('19-22,27-30 * * * *', getData);
  }
  cron.schedule('*/15,*/42 5-12,15,16 * * 1-5', getData);
}
//! *****My FINISH***********************************


//? ******scheduleTasks***START************************************
function scheduleTasks(task) {
  const dayOfWeek = new Date().getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Не выполнять задания в выходные дни (0 - воскресенье, 6 - суббота)
    return;
  }

  function executeTask() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (
      (currentHour >= 5 && currentHour < 14 && currentMinute === 0) ||
      (currentHour >= 5 && currentHour <= 13 && currentMinute === 30)
    ) {
      task();
    }

    if (currentHour >= 14 && currentHour < 18 && currentMinute === 0) {
      task();
    }
  }

  // Запускать задачу каждую минуту и проверять условия
  // setInterval(executeTask, 60000);
}

// Пример задачи
// function myTask() {
//   console.log('Задача выполняется:', new Date().toLocaleString());
// }

// Расписание выполнения задачи
// scheduleTasks(myTask);
//? ******scheduleTasks***FINISH************************************
