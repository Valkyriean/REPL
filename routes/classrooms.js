/**
 * Created by Li on 2017/3/19.
 */
var express = require('express');
var router = express.Router();
var dashBoard = require('../controllers/Classrooms/dashBoard');
var newClassroom = require('../controllers/Classrooms/newClassroom');
var classroomSetting = require('../controllers/Classrooms/classroomSetting');
var decodeToken = require('../controllers/Users/decodeToken').readToken;

//Dash Board
router.post('/dashBoard',decodeToken,dashBoard.postDashboard);
//token
router.post('/newClassroom',decodeToken,newClassroom.newClassroom);
router.post('/classroomSetting',decodeToken,classroomSetting.updateClassroomSetting);
router.post('/updateEnter',decodeToken,classroomSetting.updateEnter);
router.post('/updateLeave',decodeToken,classroomSetting.updateLeave);


module.exports = router;