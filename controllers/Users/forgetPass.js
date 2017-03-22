/**
 * Created by 马鸣玉 on 2017/3/7.
 */
const nodemailer = require('nodemailer');
var User = require('../../models/UserModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '1034743427@qq.com',
        pass: 'vhkordjldgczbbfe'
    }
});

exports.lostPass = function (req,res,next) {
    User.findOne({'email': req.body.email},function (err, user) {
        if(err) throw err;
        if(user) {
	        console.log(user);
	        var token = jwt.sign({
		        data: user.email
	        }, secretKey, {expiresIn:'24h'});
	        console.log(token);
	        var mailOption = {
	            from: '1034743427@qq.com',
	            to: req.body.email,
	            subject: 'Change your REPL password',
	            text: "localhost:3000/#!/findpass/" + token//only for testing
	        };
	        transporter.sendMail(mailOption, function (err, response) {
	            if(err) throw err;
	            console.log("success");
	        });
	        res.json({"status": 10});
	        //TODO
        }else {
	        console.log("user does not found");
	        //we are not letting user know the email is not used.
        }
    });
};

exports.findPass = function(req,res,next){
	jwt.verify(req.body.token, secretKey,function(err,decoded){
		if(err){
			res.json({"status": 10});
		}else{
			//not change how it find decoded, its a special token made by email
			User.findOne({'email':decoded.data}, function(err,user){
				if(err) throw err;
				if(user){
					user.pass = req.encrypted;
					user.save();
					res.json({"status": "success", "user": user});
					//TODO
				}else{
					res.json({"status": 51});
					//TODO
					console.log("wrong token/n"+user.email+"/n"+decoded.data)
				}
			})
		}
	});
};
