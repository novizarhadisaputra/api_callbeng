const app = require('express')();
const userRouter = require('./user');
const articleRouter = require('./article');
const locationRouter = require('./location');
const chatRoomRouter = require('./chatRoom');

app.use(userRouter);
app.use('/article', articleRouter);
app.use('/location', locationRouter);
app.use('/chat', chatRoomRouter);


module.exports = app;
