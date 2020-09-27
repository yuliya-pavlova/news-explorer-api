const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new BadRequestError('Нет такого пользователя');
    })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Нет такого пользователя');
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
    throw new BadRequestError('Укажите пароль длиной не менее 8 символов');
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
        next(err);
      });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch((err) => {
      next(err);
    });
};
