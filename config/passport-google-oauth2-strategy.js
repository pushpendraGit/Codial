const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviroment');

passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret : env.google_client_sccrit,
        callbackURL : env.google_callback_url,
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({
            email : profile.emails[0].value,
        }).exec(function(err, user){
            if(err){
                console.log(err);
                console.log("PASSPORT ERROR !!!");
                return;
            }
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar : profile.photos[0].value
                }, function(err, user){
                    if(err){
                        console.log("User not created : ", err);
                        return
                    }  
                    console.log(user);
                    return done(null, user);
                });
            }
        });
    }  
));


module.exports = passport;