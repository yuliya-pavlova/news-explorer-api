const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const BadRequestError = require('../errors/bad-request-err');
const errorMessages = require('../constants');

const vallidatorURL = (link) => {
  if (!validator.isURL(link)) {
    throw new BadRequestError(errorMessages.incorrectUrlError);
  } else {
    return link;
  }
};

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }).unknown(true),
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
});

const validatePassword = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }).unknown(true),
});

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(vallidatorURL),
    image: Joi.string().required().custom(vallidatorURL),
  }),
  headers: Joi.object().keys({
    'Content-Type': 'application/json',
  }).unknown(true),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      throw new BadRequestError(errorMessages.incorrectIdError);
    }),
  }),
});

module.exports = {
  validateSignup,
  validatePassword,
  validateAuth,
  validateArticle,
  validateObjectId,
};
