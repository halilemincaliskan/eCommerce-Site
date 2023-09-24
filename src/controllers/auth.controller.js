const User = require("../models/User.model");
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

async function pageLoad(req, res){
    if (req.session.jwtToken) {
        console.log('JWT TOKEN -> '+req.session.jwtToken);
        res.redirect('/');
    } else {
        res.render('auth');
    }
}

async function test(req, res){
    req.session.destroy();
    res.send('Session succesfuly deleted.');
}

async function test2(req, res){
    res.send("Data -> "+req.session.jwtToken);
}

async function login(req, res){
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user.validPassword(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expiration});
                req.session.regenerate(function (err) {
                    if (err) next(err)
                    req.session.jwtToken = token;
                    req.session.save(function (err) {
                        if (err) next(err)
                        res.redirect('/');
                    })
                })
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

async function getUser(req, res){
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        try {
            token = token.trim();
            const decoded = jwt.verify(token, jwtConfig.secret);
            
            User.findOne({_id: decoded._id})
            .then((user) => {
                res.json({user});
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized'});
        } 
    } else {
        return res.status(400).json({ message: 'Authorization header is missing'});
    }
}

module.exports = {
    login,
    register,
    getUser,
    pageLoad,
    test,
    test2
};