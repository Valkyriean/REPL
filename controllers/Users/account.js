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
            res.json({"status": 131});
        }else{
            console.log('User saved successfully!');
            res.json({"status": 1});
        }
    });
};

exports.updateAccount = function(req,res){
    User.findOne({'userID':req.decoded,'pass':req.encryptedOldPass},function (err,user) {
        if(err) throw err;
        if(user){
            user.pass = req.encryptedNewPass;
            user.save();
            res.json({"status": 1});
        }else{
            //null user or wrong pass
            res.json({"status": 132});
        }
    });
};

exports.deleteAccount = function(req,res){
    User.findOne({'userID':req.decoded,'pass':req.encrypted},function (err,user) {
        if(err) throw err;
        if(user){
	        user.remove();
	        res.json({"status": 1});
	        console.log("delete success");
        }else{
	        console.log("user is not found or wrong pass");
	        res.json({"status": 133});
        }
    });
};
