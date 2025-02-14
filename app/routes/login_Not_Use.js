console.log('000');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var bcrypt = require('bcrypt');
module.exports = app => {

 //   const tutorials = require("../controllers/tutorial.controller.js");
    const login = require("../models/login")
    var router = require("express").Router();
    
    console.log('000');
    
    router.post('/saveuser', function(req, res, next) {
        const password = req.body.password;
        const saltRounds = 12;
        bcrypt.hash(password, saltRounds, function(err, hash) {
        req.body.password = hash;
        login.addUser(req.body,function (err, rows) {
            try{
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            } 
            catch( a){
                res.status(401).json({message:'error .',status:false})
            }
        });
    });
});

router.post('/user', function(req, res, next) {
    app.use(passport.initialize());
app.use(passport.session());
    passport.authenticate('local', {session: false}, function(err, user, info) {
        
        if (err) { return next(err); }

        if ( ! user) {
            return res.status(500).json(info.message)
        }

        const payload = {
            username: user.username,
            email: user.email
        }
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, 'secret123', options);
        
        res.json({token});

    })(req, res, next);
})



    router.put('/user', function(req, res, next) {
       
       const password = req.body.password;
       const saltRounds = 12;
        bcrypt.hash(password, saltRounds, function(err, hash) {
        req.body.password = hash;
      });

      var options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = 'secret123'; 
    
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(username, password, done) {
            authModel.findOne(username, function(err, result) {
    
                if (err) { return done(err); }
        
                if (result.length === 0) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
    
                const user = result[0];
                bcrypt.compare(password, user.password, function(err, result) {
                    if ( ! result) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                    return done(null, user);
                })
            })
        }
    ));









        //login.getUser(req.body,function (err, rows) {
           // try{
             //   if (err) {
              //      res.json("test :"+err);
               //     } 
                //    else {
                 //   res.json(rows);
               // }
           // } 
           // catch(a){
           //     res.json({message:'errscsor .',status:false})
           // }
       // });
    });

    

    app.use('/api/login', router);
}