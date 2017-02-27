
var User = require('../models/UserModel');
var secretKey = "alexsupreme";

exports.findUser = function(req, res, next) {
    var email = req.body.username;
    User.findOne({'emailaddress': email}, function(err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user" + email + "is not found");
            res.json({"status": "failed"});
        }
        else {
            if(req.body.password == user.password) {
                var token = jwt.sign(user.id, secretKey);
                res.json({"status": "success", "token": token});
                console.log("the token is " + token);
                console.log("success");
                next();
            }
            else {
                res.json({"status": "failed"});
                console.log("failed");
            }
        }
    })
}