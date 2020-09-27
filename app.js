require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const articles = require('./routes/articles.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(bodyParser());

app.use('/articles', articles);

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