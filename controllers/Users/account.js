/**
 * Created by phant on 2017/2/27.
 */
var User = require('../../models/UserModel');

exports.saveAccount = function(req,res,next){
    var data = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pass: req.encrypted
    };
    var newUser = new User(data);
    newUser.save(function(err) {
        if (err) {
            res.json({"status": "failed", "message":"failed to save account"});
        }else{
            console.log('User saved successfully!');
            res.json({"status": "success"});
        }
    });
};

exports.updateAccount = function(req,res,next){
    console.log("at account");
    User.findOne({'email':req.body.email},function (err,user) {
        if(err) throw err;
        if(user==null){
            console.log("user is not found");
            res.json({"status": "failed","message":"cant find user"});
            //should't happened at all
        }else{
            if(user.pass==req.encryptedOldPass){
                user.pass = req.encryptedNewPass;
                user.save();
                res.json({"status": "success"});
            }else{
                res.json({"status": "failed","message":"wrong old password"});
            }
        }
    });
};
