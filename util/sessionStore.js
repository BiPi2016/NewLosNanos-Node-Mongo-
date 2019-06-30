const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoUri = require('./constants').createConnectionString();

const sessionStore = new MongoStore({
    url: mongoUri,
    collection: 'sessions',
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
  });

module.exports = sessionStore;