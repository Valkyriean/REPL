var express = require('express');
var router = express.Router();
var encryption = require('../controllers/Users/encryption');
var validation = require('../controllers/Users/validation');
var account = require('../controllers/Users/account');
var readToken = require('../controllers/Users/readToken').readToken;
var findUser = require('../controllers/Users/findUser').findUser;
var lostPass = require('../controllers/Users/lostPass');
var findPass = require('../controllers/Users/findPass').findPass;


router.post('/signup',validation.SignUpvalidation, encryption.encryptPass,account.saveAccount);
router.post('/login',encryption.encryptPass,findUser);
router.post('/token',readToken);
router.put('/changePass',validation.passValidation,encryption.encryptBothPass,account.updateAccount);
router.delete('/deleteUser',encryption.encryptPass,account.deleteAccount);

router.post('lostPass',lostPass.sendEmail);
router.post('findPass',encryption.encryptPass,findPass);



module.exports = router;