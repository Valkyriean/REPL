var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;


exports.readToken = function(req,res,next){
    if(req.body.token == null){
        res.json({"status":"failed","message":"null token"});
    }else{
        jwt.verify(req.body.token, secretKey,function(err,decoded){
            if(err){
                res.json({"status":"failed","message":"wrong or expired token"});
            }else{
                User.findOne({'userID':decoded.data}, function(err,user){
                    if(err){
                        res.json({"status": "failed","message":"token not found"});
                        console.log("wrong token");
                    }else{
                        req.user = user;
                        next();
                    }
                })
            }
        });
    }
};