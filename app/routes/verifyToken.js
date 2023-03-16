let jwt=require('jsonwebtoken');

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request');
    }
     token=req.headers.authorization.split(' ')[1];
    if(token ==='null'){
        return res.status(401).send('Unauthorized Request');
    }
   jwt.verify(token,"secret@#$%123", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.id = decoded.id;
    next();
  });
};

module.exports=verifyToken;
