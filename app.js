const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Hello World'
  });
})

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Setup error Handler
const errorHandler = require('./handlers/errorHandlers');
app.use(errorHandler.notFound);
if (process.env.ENV === "PRODUCTION") {
  app.use(errorHandler.productionErrors);
} else {
  app.use(errorHandler.developmentErrors);
}
app.use(errorHandler.mongooseErrors);
// End setup error handler

module.exports = app;