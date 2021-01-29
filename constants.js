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
  expires: new Date(Date.now() + 604800000),
  httpOnly: true,
  sameSite: 'none',
  domain: 'https://mycoolnews.students.nomoreparties.space',
};
