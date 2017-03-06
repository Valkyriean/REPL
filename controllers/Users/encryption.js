/**
 * Created by phant on 2017/2/9.
 */
const crypto = require('crypto');
var secretKey = require('../../Strings').secretKey;

var encrypt = function(str){
    var cipher = crypto.createCipher('aes192', secretKey);
    var encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

exports.encryptPass = function(req,res,next){
    req.encrypted = encrypt(req.body.pass);
    next();
};

exports.encryptBothPass = function (req,res,next) {
    req.encryptedOldPass = encrypt(req.body.oldPass);
    req.encryptedNewPass = encrypt(req.body.newPass);
    next();
};
