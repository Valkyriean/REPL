var User = require('../../models/UserModel');


exports.findUser = function(req, res, next) {
    User.findOne({'email': req.body.email}, function(err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user is not found");
            res.json({"status": "failed","message":"cant find user"});
        }else {
            if(req.encrypted == user.pass) {
                req.user = user;
                next();
            }
            else {
                res.json({"status": "failed"});
                console.log("failed,wrong password");
            }
        }
    })
};