var express = require('express');
var router = express.Router();
var login = require('../controllers/Users/login');
var encryption = require('../controllers/Users/encryption');
var validation = require('../controllers/Users/validation');
var account = require('../controllers/Users/account');
var decodeToken = require('../controllers/Users/decodeToken').readToken;
var forgetPass = require('../controllers/Users/forgetPass');

//login
router.post('/passLogin', encryption.encryptPass, login.passLogin);
//pass, email =>status, token, loginToken
router.post('/tokenLogin', decodeToken, login.tokenLogin);
//token => status, token, loginToken

//account
router.post('/signup', validation.SignUpvalidation, encryption.encryptPass, account.saveAccount);
//email, type, firstname, lastname, pass, conf => status
router.put('/changePass', validation.passValidation, encryption.encryptBothPass, decodeToken, account.updateAccount);
//token, oldPass, newPass=> status
router.delete('/deleteUser', encryption.encryptPass, decodeToken, account.deleteAccount);
//token, pass => status

//forget pass
router.post('/lostPass',forgetPass.lostPass);
//email =>status
router.post('/findPass',encryption.encryptPass,forgetPass.findPass);
//token, pass => status

module.exports = router;