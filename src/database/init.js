const mongoose = require("mongoose");
const config = require('../config/database.config');

module.exports = () => {
    mongoose.connect(config.uri);

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
      });

    mongoose.Promise = global.Promise;
}