var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name: String,
    surname: String,
    username: String,
    pass: String,
}, {timestamps: true});

module.exports = mongoose.model("user", usersSchema);