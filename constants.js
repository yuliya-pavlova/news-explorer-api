const errorMessages = {
  authError: 'Необходима авторизация',
  badRequestError: 'Переданы некорректные данные',
  forbiddenError: 'Нет прав',
  notFoundError: 'Запрашиваемый ресурс не найден',
  incorrectIdError: 'Передан некорректный Id',
  serverError: 'На сервере произошла ошибка',
  incorrectUrlError: 'Передан некорректный url',
  incorrectLoginOrPasswordError: 'Неправильные почта или пароль',
};

module.exports = errorMessages;

module.exports.JWT_OPTIONS = {
  expiresIn: '7d',
};

module.exports.JWT_COOKIE_OPTIONS = {
  maxAge: 3600000 * 24 * 7,
  httpOnly: true,
  sameSite: true,
};
