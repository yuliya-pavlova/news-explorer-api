const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AuthError = require('../errors/auth-err');
const errorMessages = require('../constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError(errorMessages.authError);
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError(errorMessages.authError));
  }

  req.user = payload;

  return next();
};
