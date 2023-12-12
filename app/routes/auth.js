//const { response } = require('express');

const isValid = require("../routes/verifyToken");
const fs = require('fs');
var privateKey = fs.readFileSync('./app/config/private.key','utf8');


var cache = require('memory-cache');

module.exports = app => {

    var express = require('express');
    var router = express.Router();
    var authModel = require('../models/auth-model');
    var bcrypt = require('bcryptjs');
    var passport = require('passport');
    var jwt = require('jsonwebtoken');
    var cryptojs = require('crypto-js');
    
    router.post('/signup', function(req, res) {
               

        const password = req.body.password;
        const saltRounds = 9;
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

            var captcha=cache.get('captcha');
            var captcha2=req.body.captcha2;
        
            if (captcha!=captcha2){
               
                return res.json({success:"1",message:"Captcha Not Matched"});
               
                }


        var pwd = req.body.password;
        const siteKey="rr6LkkkkfbR8shhhkAA2zjjjjMSqaBYcLPs16c4oX14555887"

        try {
                    var bytes = cryptojs.AES.decrypt(pwd, siteKey);
                    if (bytes.toString()) {
                    pwd= JSON.parse(bytes.toString(cryptojs.enc.Utf8));
                    req.body.password=pwd;
                    }
            
          } catch (e) {
                    console.log(e);
          }

            passport.authenticate('local', {session: false}, function( err,user,info) {
            
            if (err) { return next(err); }

            
    
            if (!user){

                return res.json({success:"2",message:"Incorrect User Credentials..."});
                      }
              
            const payload = {
                            // username: user.username,
                            // email: user.email,
                            // id:user.id,
                            username: cryptojs.AES.encrypt(user.username, 'kkfbR8shhhkA11').toString(),
                            email: cryptojs.AES.encrypt(user.email, 'kkfbR8shhhkA22').toString(),
                            id: cryptojs.AES.encrypt(user.id, 'kkfbR8shhhkA33').toString()
                            }

            const options = {
                            algorithm: "RS256", //New code added
                            expiresIn: "24H",
                            subject: `${user.id}`
                            }
         
            const token = jwt.sign(payload, privateKey,options);
            
             res.json({success:"3",token});

             //res.json({token});
    
        })(req, res, next);
    })
    


    router.get('/dashboard', isValid, (req, res)=> {
    
       // const userId= req.userData.id;
        const Id=  cryptojs.AES.decrypt(req.userData.id, 'kkfbR8shhhkA33');
        const userId = Id.toString(cryptojs.enc.Utf8)

        console.log (userId);

        authModel.findById(userId, function(err, result){
           
         if(err){
            res.json({ success:false, message: "Server Fail" });
            
        }
        if(result)
            res.json({ success:true, data:result });
        
    });
       
    
    })



    router.get('/captcha',(req,res)=>{
        
     var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'
                         ,'W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i',
                         'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '!','@','#','$','%','^','&','*','+'];
                         var a = alpha[Math.floor(Math.random()*71)];
                         var b = alpha[Math.floor(Math.random()*71)];
                         var c = alpha[Math.floor(Math.random()*71)];
                         var d = alpha[Math.floor(Math.random()*71)];
                         var e = alpha[Math.floor(Math.random()*71)];
                         var f = alpha[Math.floor(Math.random()*71)];
        
                         var final = a+b+c+d+e+f;
                         
        cache.put('captcha', final);      
          res.json({captcha:final})

    })

router.post('/matchcaptha',(req,res,next)=>{
     // var captcha=req.body.captcha;
        var captcha=cache.get('captcha');
        var captcha2=req.body.captcha2;
        
       if (captcha!=captcha2){
         return res.json({success:false,message:"Captcha Not Matched"});
       }
       else{
        return res.json({success:true,message:"Captcha Matched"});
       }
   
})

app.use('/api/auth', router)
}