const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const errorMessages = require('../constants');
const {
  JWT_OPTIONS,
  JWT_COOKIE_OPTIONS,
} = require('../constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new BadRequestError(errorMessages.incorrectIdError);
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError(errorMessages.incorrectIdError);
      }
      const {
        email, name,
      } = user;
      res.send({ email, name });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  if (req.body.password === undefined || req.body.password.length < 8) {
    throw new BadRequestError(errorMessages.badRequestError);
  } else {
    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }))
      .then((user) => {
        const {
          name, email,
        } = user;
        res.send({
          name, email,
        });
      })
      .catch((err) => {
        if (err.code === 11000 && err.name === 'MongoError') {
          next(new BadRequestError('Пользователь уже зарегистрирован'));
        }
        return next(err);
      });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res
        .cookie('jwt', token, JWT_COOKIE_OPTIONS)
        .send({ token, name: user.name });
    })
    .catch((err) => {
      next(err);
    });
};
