/**
 * Created by Li on 2017/3/19.
 */
var express = require('express');
var router = express.Router();
var dashBoard = require('../controllers/Classrooms/dashBoard');
var newClassroom = require('../controllers/Classrooms/newClassroom');
var classroomSetting = require('../controllers/Classrooms/classroomSetting');
var decodeToken = require('../controllers/Users/decodeToken').readToken;
var leaveClassroom = require('../controllers/Classrooms/leaveClassroom');
var joinClassroom = require('../controllers/Classrooms/joinClassroom');

//Dash Board
router.post('/dashBoard',decodeToken,dashBoard.postDashboard);
//token
router.post('/newClassroom',decodeToken,newClassroom.newClassroom);
router.post('/classroomSetting',decodeToken,classroomSetting.updateClassroomSetting);
router.post('/updateEnter',decodeToken,classroomSetting.updateEnter);
router.post('/updateLeave',decodeToken,classroomSetting.updateLeave);
router.post('/leaveClassroom',decodeToken,leaveClassroom.leaveClassroom);
router.delete('/deleteClassroom',decodeToken,classroomSetting.deleteClassroom);
router.post('/cloneClassroom',decodeToken,newClassroom.cloneClassrooms);
router.post('/joinClassroom',decodeToken,joinClassroom.joinClasses);
router.post('/transferOwnership',decodeToken,classroomSetting.transferOwnership);
router.post('/kickTeacher',decodeToken,classroomSetting.kickTeacher);
router.post('/kickStudent',decodeToken,classroomSetting.kickStudent);

module.exports = router;