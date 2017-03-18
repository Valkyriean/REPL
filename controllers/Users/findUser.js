var User = require('../../models/UserModel');


exports.findUser = function(req, res, next) {
    User.findOne({'email': req.body.email}, function(err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user is not found");
            res.json({"status": 21});
        }else {
            if(req.encrypted == user.pass) {
                req.user = user;
                next();
            }
            else {
                res.json({"status": 22});
                console.log("failed,wrong password");
            }
        }
    })
};