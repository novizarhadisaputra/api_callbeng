const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const chatRoomController = require('../controllers/chatRoomController');
const auth = require('../middlewares/auth');

router.get('/', auth, catchErrors(chatRoomController.getChatRoom));
router.post('/', auth, catchErrors(chatRoomController.postChatRoom));

module.exports = router;
