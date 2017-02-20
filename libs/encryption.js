/**
 * Created by phant on 2017/2/9.
 */
const crypto = require('crypto');
var secretKey = "alexsupreme";

exports.encrypt = function(str){
    var cipher = crypto.createCipher('aes192', secretKey);
    var encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

