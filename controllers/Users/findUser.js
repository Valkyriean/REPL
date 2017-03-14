var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.findUser = function(req, res, next) {
    User.findOne({'email': req.body.email}, function(err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user is not found");
            res.json({"status": "failed","message":"cant find user"});
        }else {
            if(req.encrypted == user.pass) {
                console.log(user);
                var token = jwt.sign({
                    data: user.userID
                },secretKey, { expiresIn: '24h' });
                // res.json({"status": "success", "user": user,"token": token});
                req.token = token;
                req.user = user.user;
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