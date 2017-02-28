var express = require('express');
var router = express.Router();
var encryption = require('../controllers/Users/encryption').enctyption;
var validation = require('../controllers/Users/validation').validation;
var saveAccount = require('../controllers/Users/saveAccount').saveAccount;
var readToken = require('../controllers/Users/readToken').readToken;
var findUser = require('../controllers/Users/findUser').findUser;

router.post('/signup',validation,encryption,saveAccount);
router.post('/login',readToken,encryption,findUser);

module.exports = router;
