const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => console.log(`Error messages : ${err}`));

mongoose.connection.once('open', function() {
	console.log('Mongo is connected');
});
