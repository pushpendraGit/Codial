const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: '567797113711-j2b21g4l37tiqjisghqugc89047c995n.apps.googleusercontent.com',
        clientSecret : 'nuaxJX23d9jcnVsMrG0sUM-X',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
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
            // console.log(profile);
            // console.log("PIc:",profile.photos[0].value);
            if(user){
                return done(null, user);
            }else{
                // console.log("PIc:",profile.photos[0].value);
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