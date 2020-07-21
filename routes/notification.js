const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth');

router.get('/', auth, catchErrors(notificationController.getNotification));
router.post('/', auth, catchErrors(notificationController.postNotification));

module.exports = router;
