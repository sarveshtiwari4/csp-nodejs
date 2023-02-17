const { response } = require('express');

module.exports = app => {

    var express = require('express');
    var router = express.Router();
    var authModel = require('../models/auth-model');
    var bcrypt = require('bcryptjs');
    var passport = require('passport');
    var jwt = require('jsonwebtoken');
    
    router.post('/signup', function(req, res) {
        const password = req.body.password;
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash) {
            req.body.password = hash;
            authModel.signup(req.body, function(err, result) {
                res.json({ data: result, error: err })
            });
        });
    });

    router.put('/pwdchange', function(req, res, next) {
        
        const username = req.body.username;
        const password = req.body.password;
        const oldpassword = req.body.oldpassword;
        const saltRounds = 10;
       // let findone_result;
        authModel.findOne(username, function(err,result) {
           
            if (err) return console.log(err);
            
            if (result.length>0){
                
                    bcrypt.compare(oldpassword, result[0].password,function(err,match){
                        if (err) {return next(err)}
                        if(match){
                        // console.log(match);
                            bcrypt.hash(password, saltRounds, function(err, hash) {
                                req.body.password = hash;
                                
                                authModel.pwdchange(req.body, function(err, result) {
                                    res.json({ data: result, error: err })
                                });
                        
                            });
                        }
           
                    })
            }
        })
       
    })
       
        
   




    
    router.post('/login', function(req, res, next) {

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
    
app.use('/api/auth', router)
}