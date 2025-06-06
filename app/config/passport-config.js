var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var authModel = require('../models/auth-model');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

 var options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = 'rr6LkkkkfbR8shhhkAA2zjjjjMSqaBYcLPs16c4oX14555887'; 

 passport.use(new LocalStrategy(
    {
        username: 'username',
        password: 'password',
       
    },
     function(username, password, done) {
          
         authModel.findOne(username, function(err, result) {

            if (err) { return done(err); }
    
            if (result.length === 0) {
                
                return done( null,false, {message: 'Incorrect username.'});
               
            }

            const user = result[0];
           
             bcrypt.compare(password, user.password, function(err, result) {

                if (!result) {
                    return done(null,false, {message:'Incorrect password.'});
                   
                }
                return done(null, user);
            })
        
    
    })
    }
))

passport.use(new JwtStrategy(options, function(jwtPayload, done) {

    authModel.findById(jwtPayload.sub, function(err, result) {
        if (err) {
            return done(err, false);
        }

        if (result.length === 0) {
            return done(null, false);
        }

        return done(null, result[0]);
    })
}))
