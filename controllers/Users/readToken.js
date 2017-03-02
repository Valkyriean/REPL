var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;


exports.readToken = function(req,res,next){
    if(req.body.token == null){

    }else{
        jwt.verify(req.body.token, secretKey,function(err,decodede){
            if(err){
                res.json({"status":"failed","message":"wrong or expired token"});

            }else{
                User.findOne({'email':decodede.data}, function(err,user){
                    if(err){
                        res.json({"status": "failed","message":"token not found"});
                        console.log("wrong token/n"+user.email+"/n"+decoded)
                    }else{
                        res.json({"status": "success", "user": user});
                    }
                })
            }
        });
    }
};