/**
 * Created by phant on 2017/2/9.
 */

var isEmail = function(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
};

var goodPassword = function(str){
    var reg =/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
    return reg.test(str);
};

var goodName = function(str){
    var reg =/^[A-Za-z]{1,}$/;
    return reg.test(str);
};

exports.validation = function(req,res,next){

};