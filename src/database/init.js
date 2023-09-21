var mongoose = require("mongoose");

const server = '127.0.0.1:27017'; 
const database = 'eCommerceSiteDB'; 

module.exports = () => {
    mongoose.connect(`mongodb://${server}/${database}`);

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
      });

    mongoose.Promise = global.Promise;
}