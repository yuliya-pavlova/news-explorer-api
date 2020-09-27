const router = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
