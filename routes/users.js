var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
var secretKey = "alexsupreme";


function encrypt(str){
    var cipher = crypto.createCipher('aes192', secretKey);
    var encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}

function goodPassword(str){
    var reg =/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    return reg.test(str);
}

function goodName(str){
    var reg =/^[A-Za-z]{1,}$/;
    return reg.test(str);
}

/* GET users listing. */
router.post('/login', function(req, res) {
    console.log("login connected");
    var username = req.body.username;
    var password = req.body.password;
    console.log("username is " + username + " and the password is " + password);
    var encryptedinput = encrypt(password);
    console.log("The encrypted password is "+encryptedinput);
    Signup.findOne({'emailaddress':username},function(err,user){
        if(err) throw err;
        if(user==null){
            console.log('user '+username+' is not found ');
            res.json({"status": "Failed, Email has not been registered yet"})
        }else{
            console.log(user.toString());
            console.log(user.password);
            if(user.password == encryptedinput){
                var token = jwt.sign(user.id,encryption.secretKey);
                console.log("The token is "+token);
                res.json({"status": "success","token":token,"lastname":user.lastname});
                console.log("success");
            }else{
                res.json({"status":"Failed, Wrong Password!"});
                console.log("failed");
            }
        }
    });
});

router.post('/signup',function(req,res){
    console.log("Sign up connected");
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var verifypassword = req.body.verifypassword;
    if(!isEmail(email)){
        //wrong email
        res.json({"status": "we"});
        console.log("wrong email");
    }else if(!goodPassword(password)){
        //not good password
        res.json({"status": "wp"});
        console.log("wrong password");
    }else if(password!=verifypassword){
        //not same password
        res.json({"status": "dp"});
        console.log("different password");
    }else if(!goodName(firstname)){
        //not good first name
        res.json({"status":"wf"});
        console.log("wrong first name");
    }else if(!goodName(lastname)){
        //not good last name
        res.json({"status":"wl"});
        console.log("wrong last name");
    }else{
        Signup.findOne({'emailaddress':email},function(err,user){
            if(err) throw err;
            if(user==null){
                var encrypted = encryption.encrypt(password);
                console.log(encrypted);
                var newUser = new User({
                    emailaddress: email,
                    firstname: firstname,
                    lastname: lastname,
                    password: encrypted
                });
                newUser.save(function(err) {
                    if (err) throw err;
                    console.log('User saved successfully!');
                });
                res.json({"status": "Success"});
                console.log("Success");
            }else{
                res.json({"status":"repeat"});
                console.log('repeat email');
            }
        });
    }
});

module.exports = router;
