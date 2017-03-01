var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;


exports.readToken = function(req,res,next){
    if(req.body.token == null){
        next();
    }else{
        var decoded = jwt.verify(req.body.token, secretKey);
        User.findOne({'email':decoded}, function(err,user){
            if(err){
                res.json({"status": "failed","message":"token not found"});
                console.log("wrong token/n"+user.email+"/n"+decoded)
            }else{
                res.json({"status": "success", "user": user});
            }
        })
    }
};