const http = require('http');
const mongoose = require('mongoose');
const {PORT,DBNAME} = require('./src/config');
const app = require('./app');

const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URI, {dbName: DBNAME})
    .then(() => {
        console.log('Connected to MongoDB.');
        server.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB. ', err);
    });

module.exports = server