const { JWT_SECRET = 'dev-secret', NODE_ENV, DB = 'mongodb://localhost:27017/newsdb' } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DB,
};
