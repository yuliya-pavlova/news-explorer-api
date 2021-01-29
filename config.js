const { JWT_SECRET = 'dev-secret', NODE_ENV, DB = 'mongodb://localhost:27017/newsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DB,
};

const whitelist = [
  'http://localhost:8080',
  'https://localhost:8080',
  'http://mycoolnews.students.nomoreparties.space',
  'https://mycoolnews.students.nomoreparties.space',
  'http://www.mycoolnews.students.nomoreparties.space',
  'https://www.mycoolnews.students.nomoreparties.space',
];

module.exports.WHITELIST = whitelist;
