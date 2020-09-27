const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

// const owner = '5f496a3d005b0dd9984458ce';
const owner = '5f4820e21dfcd4ac212e543a';

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ article }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getArticles = (req, res, next) => {
  Article.find({})
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
      if ((article.owner).toString() !== owner) {
        throw new ForbiddenError('Нет прав на удаление статьи');
      }
      article.remove();
      return res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
