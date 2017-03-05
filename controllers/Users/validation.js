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

exports.SignUpvalidation = function(req,res,next){
    var a = !isEmail(req.body.email);
    var b = !goodPassword(req.body.pass);
    var c = req.body.pass != req.body.conf;
    var d = !goodName(req.body.firstname);
    var e = !goodName(req.body.lastname);
    if(a || b || c || d || e) {
        res.json({"status": "failed","message":"validation failed"});
    }else{
        User.findOne({'email':req.body.email},function(err,user){
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

exports.passValidation = function(req,res,next){
    console.log("at validation");
    if(!goodPassword(req.body.newPass)){
        res.json({"status": "failed","message":"bad password"});
    }else{
        next();
    }
};

