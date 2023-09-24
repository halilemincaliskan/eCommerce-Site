const User = require('../models/User.model');
const jwtConfig = require('../config/jwt.config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const jwtToken = req.session.jwtToken;
    if (jwtToken) {
        try {
            token = jwtToken.trim();
            const decoded = jwt.verify(token, jwtConfig.secret);
            
            User.findOne({_id: decoded._id})
            .then(() => {
                return next();
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            return res.status(401).json({ message: "Error: " + error });
        } 
    } else {
        res.redirect('/auth');
    }
}