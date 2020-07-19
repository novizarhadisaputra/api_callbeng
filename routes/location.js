const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const locationController = require('../controllers/locationController');
const auth = require('../middlewares/auth');

router.get('/', auth, catchErrors(locationController.getLocation));

module.exports = router;
