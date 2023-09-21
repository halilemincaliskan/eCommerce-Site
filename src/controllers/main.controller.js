const User = require("../models/Users.model");

async function getUser(req, res) {
    const users = await User.find({});
    try {
      res.send(users);
    } catch(error) {
      res.status(500).send(error)
    }
};

async function postUser(req, res){
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      pass: req.body.pass,
    });
    try {
      await user.save();
      res.send(user);
    } catch(error) {
      res.status(500).send(error)
    }
};

module.exports = {
    getUser,
    postUser
  };