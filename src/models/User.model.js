var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Name can't be blank."]
    },
    surname: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Surname can't be blank."]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        match: /\S+@\S+\.\S+/,
        trim: true,
        required: [true, "Email can't be blank."]
    },
    hash: String,
    salt: String
}, {timestamps: true,});

userSchema.method({
    setPassword(password){
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    },
    validPassword(password){
        var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash == hash;
    }
});

// userSchema.methods.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// userSchema.methods.validPassword = function(password){
//     var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash == hash;
// }

userSchema.plugin(uniqueValidator, {message: 'This email is already taken.'});

module.exports = mongoose.model("user", userSchema);