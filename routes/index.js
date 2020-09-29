const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const articleRouter = require('./articles');
const userRouter = require('./users');

router.use('/articles', articleRouter);
router.use('/users', userRouter);

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
