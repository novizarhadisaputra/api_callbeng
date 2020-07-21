const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const articleController = require('../controllers/articleController');

router.get('/', catchErrors(articleController.getArticle));
router.post('/', catchErrors(articleController.postArticle));

module.exports = router;
