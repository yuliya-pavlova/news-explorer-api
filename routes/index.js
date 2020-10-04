const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const { login, createUser } = require('../controllers/users.js');
const articleRouter = require('./articles');
const userRouter = require('./users');
const { validateSignup, validatePassword, validateAuth } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const errorMessages = require('../constants');

router.post('/signin', validateAuth, validatePassword, login);
router.post('/signup', validateSignup, validatePassword, createUser);

router.use(auth);

router.use('/articles', articleRouter);
router.use('/users', userRouter);

router.use(() => {
  throw new NotFoundError(errorMessages.notFoundError);
});

module.exports = router;
