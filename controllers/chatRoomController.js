const mongoose = require('mongoose');
const ChatRoom = mongoose.model('ChatRoom');
const Notification = mongoose.model('Notification');

exports.getChatRoom = async (req, res) => {

};

exports.postChatRoom = async (req, res) => {
	const { name } = req.body;

	const nameRegex = /^[A-Za-z\s]+$/;

	if (!nameRegex.test(name)) throw `Warning! ${name}. Chatroom name can contain only alphabets.`;

	const chatRoom = new ChatRoom({ name });

	const chatRoomExist = await ChatRoom.findOne({ name });

	if (!chatRoomExist) await chatRoom.save();

	res.status(200).json({
		message: `Chatroom connected!`,
		data: chatRoomExist ? chatRoomExist : chatRoom 
	});
};

exports.updateChatRoom = async (req, res) => {};

exports.deleteChatRoom = async (req, res) => {};
