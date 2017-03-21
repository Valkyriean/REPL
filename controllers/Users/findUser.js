var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.findUser = function(req, res, next) {
    User.findOne({'email': req.body.email}, function(err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user is not found");
            res.json({"status": 21});
        }else {
            if(req.encrypted == user.pass) {
                res.json({
                    "status":20,
                    "token":jwt.sign({data: req.user.userID},secretKey, { expiresIn: '24h' }),
                });
            }
            else {
                res.json({"status": 22});
                console.log("failed,wrong password");
            }
        }
    })
};