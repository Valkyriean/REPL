var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;


exports.readToken = function(req,res,next){
    if(req.body.token == null){
        res.json({"status": 23});
    }else{
        jwt.verify(req.body.token, secretKey,function(err,decoded){
            if(err){
                res.json({"status": 23});
            }else{
                User.findOne({'userID':decoded.data}, function(err,user){
                    if(err){
                        res.json({"status": 23});
                    }else{
                        req.user = user;
                        next();
                    }
                })
            }
        });
    }
};