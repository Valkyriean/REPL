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
router.post('/tokenLogin', decodeToken, login.tokenLogin);

//account
router.post('/signup', validation.SignUpvalidation, encryption.encryptPass, account.saveAccount);
router.put('/changePass', validation.passValidation, encryption.encryptBothPass, decodeToken, account.updateAccount);
router.delete('/deleteUser', encryption.encryptPass, decodeToken, account.deleteAccount);

//forget pass
router.post('/lostPass',forgetPass.lostPass);
router.post('/findPass',encryption.encryptPass,forgetPass.findPass);

module.exports = router;