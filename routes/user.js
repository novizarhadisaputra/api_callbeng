const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');

router.post('/login', catchErrors(userController.login));
router.post('/registration', catchErrors(userController.registration));

module.exports = router;
