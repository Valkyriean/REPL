/**
 * Created by phant on 2017/2/9.
 */
var User = require('../../models/UserModel');

var isEmail = function(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
};

var goodPassword = function(str){
    var reg =/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    return reg.test(str);
};

var goodName = function(str){
    var reg =/^[A-Za-z]{1,}$/;
    return reg.test(str);
};

exports.validation = function(req,res,next){
    var a = !isEmail(req.body.email);
    var b = !goodPassword(req.body.password);
    var c = req.body.password != req.body.verifypassword;
    var d = !goodName(req.body.firstname);
    var e = !goodName(req.body.lastname);
    if(a || b || c || d || e) {
        res.json({"status": "failed","message":"validation failed"});
    }else{
        User.findOne({'emailaddress':req.body.email},function(err,user){
            if(err) throw err;
            if(user==null){
                next();
            }else{
                res.json({"status":"failed","message":"repeat email"});
                console.log('repeat email');
            }
        });
    }
};