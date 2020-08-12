const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/login', catchErrors(userController.login));
router.post('/registration', catchErrors(userController.registration));
router.post('/confirm-account', catchErrors(userController.confirmAccount));
router.post('/resend-verification', catchErrors(userController.resendVerification));
router.get('/verify-token', catchErrors(userController.verifyToken));


router.get('/users', [auth], catchErrors(userController.read));
router.get('/user/profile', [auth], catchErrors(userController.profile));
router.put('/user/update', [auth], catchErrors(userController.updateUser));
router.delete('/user/delete', [auth], catchErrors(userController.deleteUser));

module.exports = router;
