const User = require("../models/Users.model");

function getUser(req, res) {
    User.find().then((user) => {
      res.json(user);
    }).catch((err) => {
      res.json(err);
    });
};

function postUser(req, res){
    new User({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      pass: req.body.pass,
    }).save().then(() => {
        res.json("Kaydetme İşlemi Başarılı.");
    }).catch((err) => {
        res.json(err);
        console.log(err);
    });
};

module.exports = {
    getUser,
    postUser
  };