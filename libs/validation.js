/**
 * Created by phant on 2017/2/9.
 */

exports.isEmail = function(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
};

exports.goodPassword = function(str){
    var reg =/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    return reg.test(str);
};

exports.goodName = function(str){
    var reg =/^[A-Za-z]{1,}$/;
    return reg.test(str);
};

// THIS IS THE OLD VERSION CODES THAT NOT BEING USED ANYMORE