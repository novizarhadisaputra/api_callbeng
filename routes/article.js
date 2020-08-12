const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const articleController = require('../controllers/articleController');

router.get('/', catchErrors(articleController.read));
router.post('/', catchErrors(articleController.create));

module.exports = router;
