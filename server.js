require('dotenv').config();

// Connection MongoDB Atlas
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => console.log(`Error messages : ${err}`));

mongoose.connection.once('open', function() {
	console.log('Mongo is connected');
});

// Models
const userModel = require('./models/User');
const chatModel = require('./models/Chatroom');
const messageModel = require('./models/Message');
const roleModel = require('./models/Role');

const app = require('./app');

app.listen(process.env.PORT, () => {
	console.log(`Server is running port ${process.env.PORT}`);
});
