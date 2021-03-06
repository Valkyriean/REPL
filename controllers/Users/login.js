var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.passLogin = function(req, res) {
    User.findOne({'email': req.body.email}, function(err, user) {
        if(err) throw err;
        if(user) {
	        if(req.encrypted === user.pass) {
		        res.json({
			        "status":"success",
			        "token":jwt.sign({data: user.userID},secretKey),
			        "loginToken":jwt.sign({data: user.userID},secretKey, { expiresIn: '24h' })
		        });
	        }
	        else {
		        res.json({"status": "wrong pass"});
		        //wrong pass
	        }
        }else {
	        res.json({"status": "user not found"});
	        //user not found
        }
    })
};

exports.tokenLogin = function(req, res) {
	User.findOne({'userID':req.decoded}, function(err,user){
		if(err) throw err;
		if(user){
			res.json({
				"status":"success",
				"token":jwt.sign({data: user.userID},secretKey),
                "loginToken":jwt.sign({data: user.userID},secretKey, { expiresIn: '24h' })
			});
		}else{
            //user not found
			res.json({"status": "user not found"});
		}
	})
};
