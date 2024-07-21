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
// cron.schedule('31-33,50-52 * * * *', getData);
// cron.schedule('*/30 * * * * *', getData);
// cron.schedule('*/15 * * * * *', getData);
// cron.schedule('*/15,*/42 5-12,15,16 * * 1-5', getData);

function startScheduleTasks() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Пн = 0, Вс = 6 ??
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    cron.schedule('15,25,37,42,55,1,6 20-22 * * *', getData);
    cron.schedule('44,11,22 23 * * *', getData);
  } 
  if (dayOfWeek === 1) {
    // Каждую 15-ю минуту и ​​каждую 42-ю минуту каждого часа с 5 до 12, 14, 15 и 16 часов
    cron.schedule('*/15,*/42 5-12,14,15,16 * * *', getData);
  }
  if (dayOfWeek === 2) {
    // Каждую 7-ю минуту и ​​каждую 29-ю минуту каждого часа с 5 до 11, 13, 14, 15 и 16 часов
    cron.schedule('*/7,*/29 5-11,13,14,15,16 * * *', getData);
  }
  if (dayOfWeek >= 3 && dayOfWeek <= 5) {
    //В 05:05​​
    cron.schedule('5 5 * * *', getData);
    //В 08:21​​
    cron.schedule('21 8 * * *', getData);
    //В 11:32​​
    cron.schedule('32 11 * * *', getData);
    //В 14:11
    cron.schedule('11 14 * * *', getData);
    //В 16:03
    cron.schedule('03 16 * * *', getData);
  }
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
