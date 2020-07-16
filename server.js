require('dotenv').config();
const app = require('./app');

// Connection MongoDB Atlas
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', function () {
    console.log('Mongo is connected');
});

mongoose.connection.on('error', (err) => console.log(`Error messages : ${err}`));

app.listen(process.env.PORT, () => {
    console.log(`Server is running port ${process.env.PORT}`);
})