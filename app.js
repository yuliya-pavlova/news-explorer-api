require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { DB } = require('./config');
// const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

// const whitelist = [
//   'http://localhost:8080',
//   'https://yuliya-pavlova.github.io',
//   'https://www.mycoolnews.students.nomoreparties.space',
//   'http://www.mycoolnews.students.nomoreparties.space',
//   'https://mycoolnews.students.nomoreparties.space',
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: [
//     'Content-Type',
//     'origin',
//     'x-access-token',
//     'authorization',
//     'credentials',
//   ],
//   credentials: true,
// };

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200,
// });
// app.use('*', cors(corsOptions));
app.use(bodyParser());
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

// app.use(limiter);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
