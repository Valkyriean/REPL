/**
 * Created by Li on 2017/1/16.
 */
var express = require('express');
var router = express.Router();
var users = require('./users');
var classrooms = require('./classrooms');
var assignments = require('./assignments');



router.use('/users',users);
router.use('/classrooms',classrooms);
router.use('/assignments',assignments);

module.exports = router;