const expressJwt = require('express-jwt');
const config = require('../config.json');
const User = require('../models/userModel');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/api/user/authenticate',
            '/api/user/register',
            '/api/user/forgotpassword',
            '/api/userinfo/profile/:userDetail_id',
            '/api/userinfo/updatePic/:userDetail_id',
            '/api/business/list',
            '/api/location/:business_id'
        ]
    });
}

async function isRevoked(req, payload, done) {
    if(payload && payload.sub){
        const user = await User.findOne({ _id: payload.sub, status: true });
        if (!user) {
            return done({ name: 'UnauthorizedError', status: 401 }, false);
        }
    }

    return done();
};