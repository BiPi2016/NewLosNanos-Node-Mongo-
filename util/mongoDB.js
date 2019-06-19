const mongoose = require('mongoose');
const setup = require('./constants');

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true,
    keepAliveInitialDelay: 30000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 50000,
    autoReconnect: true,
    dbName: setup.database,
    user: setup.user,
    pass: setup.password
};

module.exports = () => {
    mongoose.connect(setup.createConnectionString(), options);
    const db = mongoose.connection;
    db.on('error', () => console.log('Error while connecting to the database'));
    db.once('open', () => console.log('Connected to the database'));
}





