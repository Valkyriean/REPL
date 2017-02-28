var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = "alexsupreme";

exports.findUser = function(req, res, next) {
    var email = req.body.username;
    User.findOne({'emailaddress': email}, function(err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user" + email + "is not found");
            res.json({"status": "failed","message":"cant find user"});
        }else {
            if(req.encrypted == user.password) {
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user.id
                },secretKey);
                res.json({"status": "success", "user": user,"token": token});
                console.log("success, the token is " + token);
                next();
            }
            else {
                res.json({"status": "failed"});
                console.log("failed,wrong password");
            }
        }
    })
};