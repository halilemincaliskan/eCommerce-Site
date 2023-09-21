const User = require("../models/User.model");

async function login(req, res){
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user.validPassword(req.body.password)) {
                res.send('Login Successful');
            } else {
                res.send('Wrong Password');
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

async function register(req, res){
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    });
    try {
      user.setPassword(req.body.password);
      await user.save();
      res.send(user);
    } catch(error) {
      res.status(500).send(error)
    }
};

module.exports = {
    login,
    register
};