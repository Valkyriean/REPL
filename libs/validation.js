/**
 * Created by phant on 2017/2/9.
 */

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