/**
 * Created by phant on 2017/2/9.
 */

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
    var a = !validation.isEmail(req.body.email);
    var b = !validation.goodPassword(req.body.password);
    var c = req.body.password != req.body.verifypassword;
    var d = !validation.goodName(req.body.firstname);
    var e = !validation.goodName(req.body.lastname);
    if(a || b || c || d || e) {
        res.json({"status": "failed"});
    }else{
        User.findOne({'emailaddress':email},function(err,user){
            if(err) throw err;
            if(user==null){
                next();
            }else{
                res.json({"status":"repeat"});
                console.log('repeat email');
            }
        });
    }
};