require('dotenv').config();

// Connection MongoDB Atlas
require('./config/db.mongo');

// Models
require('./models/Index');

const app = require('./app');

app.listen(process.env.PORT, () => {
	console.log(`Server is running port ${process.env.PORT}`);
});
