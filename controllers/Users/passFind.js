var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.findPass = function(req,res,next){
    jwt.verify(req.body.token, secretKey,function(err,decoded){
        if(err){
            res.json({"status":"failed","message":"wrong or expired token"});
        }else{
            User.findOne({'email':decoded.data}, function(err,user){
                if(err){
                    res.json({"status": "failed","message":"token not found"});
                    console.log("wrong token/n"+user.email+"/n"+decoded.data)
                }else{
                    user.pass = req.encrypted;
                    user.save();
                    res.json({"status": "success", "user": user});
                }
            })
        }
    });
};