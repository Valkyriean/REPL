/**
 * Created by Li on 2017/2/9.
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
    var c = req.body.pass !== req.body.conf;
    var d = !goodName(req.body.firstname);
    var e = !goodName(req.body.lastname);
    if(a || b || c || d || e) {
        //invalid input
        res.json({"status": "invalid input"});
    }else{
        User.findOne({'email':req.body.email},function(err,user){
            if(err) throw err;
            if(user){
                //repeat email
	            res.json({"status": "repeat email"});
            }else{
	            next();

            }
        });
    }
};

exports.passValidation = function(req,res,next){
    if(!goodPassword(req.body.newPass)){
        //invalid pass
        res.json({"status": "invalid pass"});
    }else{
        next();
    }
};
