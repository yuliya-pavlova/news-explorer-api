const router = require('express').Router();
const { createArticle, getArticles, deleteArticle } = require('../controllers/articles');
const { validateArticle, validateObjectId } = require('../middlewares/validation');

router.get('/', getArticles);
router.post('/', validateArticle, createArticle);
router.delete('/:id', validateObjectId, deleteArticle);

module.exports = router;
