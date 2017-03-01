var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;


exports.readToken = function(req,res,next){
    if(req.body.token == null){
        next();
    }else{
        var decoded = jwt.verify(req.body.token, secretKey);
        User.findOne({'_id':decoded}, function(err,user){
            if(err) throw err;
            if(user == null){
                res.json({"status": "failed","message":"token not found"});
                console.log("wrong token")
            }else{
                res.json({"status": "success", "user": user});
            }
        })
    }
};