/**
 * Created by 马鸣玉 on 2017/3/7.
 */
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '1034743427@qq.com',
        pass: 'vhkordjldgczbbfe'
    }
});

exports.sendEmail = function (req,res) {
    var mailOption = {
        from: '1034743427@qq.com',
        to: req.body.email,
        subject: 'Change your REPL password',
        text: 'www.baidu.com'//only for testing
    };
    transporter.sendMail(mailOption, function (err, response) {
        if(err) throw err;
        console.log("success");
        res.json({"status": "success"});
    });
};