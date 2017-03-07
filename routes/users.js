var express = require('express');
var router = express.Router();
var encryption = require('../controllers/Users/encryption');
var validation = require('../controllers/Users/validation');
var account = require('../controllers/Users/account');
var readToken = require('../controllers/Users/readToken').readToken;
var findUser = require('../controllers/Users/findUser').findUser;
var sendEmail = require('../controllers/Users/sendEmail');

router.post('/signup',validation.SignUpvalidation, encryption.encryptPass,account.saveAccount);
router.post('/login',encryption.encryptPass,findUser);
router.post('/token',readToken);
router.post('/changePass',validation.passValidation,encryption.encryptBothPass,account.updateAccount);
router.post('/deleteUser',encryption.encryptPass,account.deleteAccount);
router.post('/sendEmail',sendEmail.sendEmail);

module.exports = router;