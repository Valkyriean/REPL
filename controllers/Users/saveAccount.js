/**
 * Created by phant on 2017/2/27.
 */
var User = require('../../models/UserModel');

exports.saveAccount = function(req,res,next){
    var newUser = new User({
        emailaddress: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pass: req.encrypted
    });
    newUser.save(function(err) {
        if (err) {
            res.json({"status": "failed", "message":"failed to save account"});
        }else{
            console.log('User saved successfully!');
            res.json({"status": "success"});
        }
    });
};
