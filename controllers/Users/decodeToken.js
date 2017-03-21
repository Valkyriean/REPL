var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.readToken = function(req,res,next){
    jwt.verify(req.body.token, secretKey,function(err,decoded){
        if(err){
            res.json({"status": 23});
        }else{
            req.decoded = decoded.data;
            next();
        }
    });
};