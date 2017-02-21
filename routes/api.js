/**
 * Created by Li on 2017/1/16.
 */
var express = require('express');
var router = express.Router();
var users = require('./users');

router.use('/users',users);

module.exports = router;