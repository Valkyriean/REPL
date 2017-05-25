/**
 * Created by phant on 2017/5/24.
 */
var express = require('express');
var router = express.Router();

var decodeToken = require('../controllers/Users/decodeToken').readToken;

var newAssignment = require('../controllers/Assignments/newAssignment');


module.exports = router;
