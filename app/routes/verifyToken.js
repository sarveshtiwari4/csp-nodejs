let jwt=require('jsonwebtoken');
const fs = require('fs');
var publicKey = fs.readFileSync('./app/config/public.key','utf8');
var cache = require('memory-cache');

//let authModel=require('../models/auth-model');

function verifyToken(req, res, next){

    if(!req.headers.authorization){

        return res.status(401).send('Unauthorized Request');
    }

     token=req.headers.authorization.split(' ')[1];
     
     var token_cache=cache.get('token');
  

     if(token != token_cache){

       return res.status(401).send({message: "Unauthorized Request"});
    }

       
     if(token ==='null'){
        return res.status(401).send({message: "Unauthorized Request"});
    }
    
   jwt.verify(token, publicKey, (err, decoded) => {
    
    if (err) {
      return res.status(401).send({message: "Unauthorized!"});
    }
   // req.id = decoded.id;
      req.userData= decoded;
     //return res.json(decoded);

      //  const userId=req.userData.id;
        
        //authModel.findById(userId, function(err, result){

        // if(err){
         // res.json({ success:false, message: "Server Fail" })
     // }
     // if(result)
      //res.json({ success:true, data:result })
      //   });

    next();
  });
};

module.exports=verifyToken;
