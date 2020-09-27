require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth.js');
const articles = require('./routes/articles.js');
const { getUser, login, createUser } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser());
app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/articles', articles);
app.get('/users/me', getUser);

app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError || err.message.indexOf('duplicate key error') !== -1 || err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: err.message });
  }
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
});
