/**
 * Created by phant on 2017/2/9.
 */
const crypto = require('crypto');
var secretKey = "alexsupreme";
exports.secretKey = "alexsupreme";
exports.encrypt = function(str){
    var cipher = crypto.createCipher('aes192',secretKey);
    var encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

// THIS IS THE OLD VERSION CODES THAT NOT BEING USED ANYMORE