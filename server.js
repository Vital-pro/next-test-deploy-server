require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const cheerio = require('cheerio');
const fs = require('fs');

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
  });
  app.locals.data = data.message;
  console.log(data);
  return app.locals.data;
}

app.get('/api/first', async (req, res) => {
  // await getData();
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
  res.send('Clock!');
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

//! *****My START***********************************
function startScheduleTasks() {
  const date = new Date();
  const dateDay = date.getDate();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();
  const dateHour = date.getHours();
  const dateMinute = date.getMinutes();
  const dateSecond = date.getSeconds();

  // Monday
  cron.schedule('33 6 * * 1', getData);
  cron.schedule('44 8 * * 1', getData);
  cron.schedule('19,48 9 * * 1', getData);
  cron.schedule('22,54 10 * * 1', getData);
  cron.schedule('28,58 11 * * 1', getData);
  cron.schedule('9,32 12-14 * * 1', getData);
  cron.schedule('33 15,16 * * 1', getData);

  // Tuesday
  // cron.schedule('42 6 * * 2', getData);
  // cron.schedule('12,44 9 * * 2', getData);
  // cron.schedule('21,48 10 * * 2', getData);
  // cron.schedule('32 11 * * 2', getData);
  // cron.schedule('6,40 12-14 * * 2', getData);
  // cron.schedule('0 15,16 * * 2', getData);
  cron.schedule('28,48 11-13 * * 2', getData);
  cron.schedule('11,22,33,44 14-15 * * 2', getData);
  cron.schedule('3,13,23,33,43,55 16-17 * * 2', getData);
  cron.schedule('1,6,21,51 19 * * 2', getData);
  cron.schedule('10,20,30,40 19-23 * * 2', getData);

  // Wednesday
  cron.schedule('2 0 * * 3', getData);
  cron.schedule('11 7 * * 3', getData);
  cron.schedule('13 9 * * 3', getData);
  cron.schedule('20 10 * * 3', getData);
  cron.schedule('37 11 * * 3', getData);
  cron.schedule('6,40 12 * * 3', getData);
  cron.schedule('0 14,15,16 * * 3', getData);

  // Thursday
  cron.schedule('14 9 * * 4', getData);
  cron.schedule('38 10 * * 4', getData);
  cron.schedule('20 11 * * 4', getData);
  cron.schedule('44 12 * * 4', getData);
  cron.schedule('0,30 13-15 * * 4', getData);

  // Friday
  cron.schedule('21 9 * * 5', getData);
  cron.schedule('37 11 * * 5', getData);
  cron.schedule('24 12 * * 5', getData);
  cron.schedule('45 13 * * 5', getData);
  cron.schedule('21 15 * * 5', getData);

  // Saturday
  cron.schedule('11 9 * * 6', getData);
  cron.schedule('42 11 * * 6', getData);
  cron.schedule('11 13 * * 6', getData);
  cron.schedule('14 15 * * 6', getData);

  // Sunday
  cron.schedule('21 9 * * 0', getData);
  cron.schedule('11 11 * * 0', getData);
  cron.schedule('24 13 * * 0', getData);
  cron.schedule('40 15 * * 0', getData);
}
// startScheduleTasks();
//! *****My FINISH***********************************

//? ******scheduleTasks***START************************************
// *1 start
// function scheduleTasks(task) {
//   const dayOfWeek = new Date().getDay();

//   if (dayOfWeek === 0 || dayOfWeek === 6) {
//     // Не выполнять задания в выходные дни (0 - воскресенье, 6 - суббота)
//     return;
//   }

//   function executeTask() {
//     const now = new Date();
//     const currentHour = now.getHours();
//     const currentMinute = now.getMinutes();

//     if (
//       (currentHour >= 5 && currentHour < 14 && currentMinute === 0) ||
//       (currentHour >= 5 && currentHour <= 13 && currentMinute === 30)
//     ) {
//       task();
//     }

//     if (currentHour >= 14 && currentHour < 18 && currentMinute === 0) {
//       task();
//     }
//   }

//   // Запускать задачу каждую минуту и проверять условия
//   setInterval(executeTask, 60000);
// }

// // Пример задачи
// function myTask() {
//   console.log('Задача выполняется:', new Date().toLocaleString());
// }

// // Расписание выполнения задачи
// scheduleTasks(myTask);
// * 1 end

// todo 1 start
// Функция для запуска задач по расписанию
function scheduleTasks() {
  // Запуск задачи по будням с 5 до 13 часов каждые 30 минут
  cron.schedule('0,30 5-13 * * 1-5', () => {
    console.log('Запуск задачи в будни с 5 до 13 часов');
    // Логика выполнения задачи
  });

  // Запуск задачи в 15:45
  cron.schedule('45 15 * * 1-5', () => {
    console.log('Запуск задачи в 15:45 по будням');
    // Логика выполнения задачи
  });

  // Запуск задачи в 16:20
  cron.schedule('20 16 * * 1-5', () => {
    console.log('Запуск задачи в 16:20 по будням');
    // Логика выполнения задачи
  });

  // Запуск задачи в 5:00 по выходным
  cron.schedule('0 5 * * 0,6', () => {
    console.log('Запуск задачи в 5:00 по выходным');
    // Логика выполнения задачи
  });

  // Запуск задачи в 13:00 по выходным
  cron.schedule('0 13 * * 0,6', () => {
    console.log('Запуск задачи в 13:00 по выходным');
    // Логика выполнения задачи
  });
}

// Запуск функции, содержащей задачи по расписанию
// scheduleTasks();
// todo 1 end
//? ******scheduleTasks***FINISH************************************
