const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const { NODE_ENV } = require('../config');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ article }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ articles }))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .orFail(() => {
      throw new BadRequestError('Нет такой статьи');
    })
    .then((article) => {
      if ((article.owner).toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление статьи');
      }
      article.remove();
      return res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
