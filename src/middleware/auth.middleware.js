const User = require('../models/User.model');
const config = require('../config/jwt.config');

module.exports = async (req, res, next) => {
    const jwtToken = req.session.jwtToken;
    console.log(jwtToken);
    if (jwtToken) {
        try {
            token = jwtToken.trim();
            const decoded = jwt.verify(token, jwtConfig.secret);
            
            User.findOne({_id: decoded._id})
            .then((user) => {
                
                return next();
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