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
            res.json({"status": 32});
            //TODO 东东自己都不知道这个咋办
        }else{
            console.log('User saved successfully!');
            res.json({"status": 30});
        }
    });
};

exports.updateAccount = function(req,res){
    User.findOne({'email':req.body.email,'pass':req.encryptedOldPass},function (err,user) {
        if(err) throw err;
        if(user==null){
            console.log("user is not found or wrong pass");
            res.json({"status": "failed","message":"cant find user or wrong pld pass"});
        }else{
            user.pass = req.encryptedNewPass;
            user.save();
            res.json({"status": "success"});
        }
    });
};

exports.deleteAccount = function(req,res){
    User.findOne({'email':req.body.email,'pass':req.encrypted},function (err,user) {
        if(err) throw err;
        if(user==null){
            console.log("user is not found or wrong pass");
            res.json({"status": "failed","message":"cant find user or wrong pld pass"});
        }else{
            user.remove();
            res.json({"status": "success"});
            console.log("delete success");
        }
    });
};
