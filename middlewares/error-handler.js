const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
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
  next();
};

module.exports = errorHandler;
