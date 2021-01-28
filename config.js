const { JWT_SECRET = 'dev-secret', NODE_ENV, DB = 'mongodb://localhost:27017/newsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DB,
};

const whitelist = [
  'http://localhost:8080',
  'https://localhost:8080',
  'http://mynewsexplorer.online',
  'https://mynewsexplorer.online/',
  'http://www.mynewsexplorer.online/',
  'https://www.mynewsexplorer.online/',
];

module.exports.WHITELIST = whitelist;
