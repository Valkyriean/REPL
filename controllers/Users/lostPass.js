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



exports.sendEmail = function (req,res,next) {
    User.findOne({'email': req.body.email},function (err, user) {
        if(err) throw err;
        if(user == null) {
            console.log("user does not found");
        }
        else {
            console.log(user);
            var token = jwt.sign({
                data: user.email
            }, secretKey, {expiresIn:'24h'});
            console.log(token);
            var mailOption = {
                from: '1034743427@qq.com',
                to: req.body.email,
                subject: 'Change your REPL password',
                text: "localhost:3000/" + token//only for testing
            };
            transporter.sendMail(mailOption, function (err, response) {
                if(err) throw err;
                console.log("success");
            });
        }
    });
};