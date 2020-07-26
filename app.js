// Migrations
const staticModel = require('./migrations/CreateMainModel');
staticModel.mainCreate;

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.get('/', function(req, res) {
	res.status(200).json({
		message: 'Hello World'
	});
});

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(fileUpload());
app.use(express.static('./public'));

// declare routes
app.use(require('./routes/index'));

// Setup error Handler
const errorHandler = require('./handlers/errorHandlers');
app.use(errorHandler.notFound);
if (process.env.ENV === 'PRODUCTION') {
	app.use(errorHandler.productionErrors);
} else {
	app.use(errorHandler.developmentErrors);
}
app.use(errorHandler.mongooseErrors);
// End setup error handler

module.exports = app;
