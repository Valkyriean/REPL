/**
 * Created by Li on 2017/2/27.
 */
var User = require('../../models/UserModel');

exports.saveAccount = function(req,res){
    var data = {
        email: req.body.email,
        type: req.body.type,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pass: req.encrypted
    };
    var newUser = new User(data);
    newUser.save(function(err) {
        if (err) {
            //user save failed
            res.json({"status": "user save failed"});
        }else{
            //save success
            res.json({"status": "success"});
        }
    });
};

exports.updateAccount = function(req,res){
    User.findOne({'userID':req.decoded,'pass':req.encryptedOldPass},function (err,user) {
        if(err) throw err;
        if(user){
            user.pass = req.encryptedNewPass;
            user.save();
            res.json({"status": "success"});
        }else{
            //user does not exist or wrong pass
            res.json({"status": "user does not exist or wrong pass"});
        }
    });
};

exports.deleteAccount = function(req,res){
    User.findOne({'userID':req.decoded,'pass':req.encrypted},function (err,user) {
        if(err) throw err;
        if(user){
	        user.remove();
	        res.json({"status": "success"});
        }else{
	        //user is not found or wrong pass
	        res.json({"status": "user is not found or wrong pass"});
        }
    });
};
