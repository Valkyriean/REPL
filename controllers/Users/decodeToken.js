var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.readToken = function(req,res,next){
    // console.log(req.body.token);
    jwt.verify(req.body.token, secretKey,function(err,decoded){
        if(err){
            //invalid token
            res.json({"status": "invalid token"});
        }else{
            req.decoded = decoded.data;
            next();
        }
    });
};
