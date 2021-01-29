require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { DB } = require('./config');
// const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

// const corsOptions = {
//   origin: [
//     'http://localhost:8080',
//     'https://localhost:8080',
//     'http://mycoolnews.students.nomoreparties.space',
//     'https://mycoolnews.students.nomoreparties.space',
//     'http://www.mycoolnews.students.nomoreparties.space',
//     'https://www.mycoolnews.students.nomoreparties.space',
//     'https://yuliya-pavlova.github.io/news-explorer-frontend',
//   ],
//   methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD'],
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

// app.use(cors);
app.use(bodyParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTION') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, HEAD');
    return res.status(200).json({});
  }
});
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

app.use(limiter);
// app.use('*', cors(corsOptions));
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
