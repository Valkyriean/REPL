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
//token =》 status, type, own, teacher, student
router.post('/newClassroom',decodeToken,newClassroom.newClassroom);
//token, name, description， programLanguage => status
router.post('/classroomSetting',decodeToken,classroomSetting.updateClassroomSetting);
//token, classroomID, allowToEnter, allowToLeave, name, description=>status
router.post('/updateEnter',decodeToken,classroomSetting.updateEnter);
//token, classroomID => status
router.post('/updateLeave',decodeToken,classroomSetting.updateLeave);
//token, classroomID => status
router.post('/leaveClassroom',decodeToken,leaveClassroom.leaveClassroom);
//token, classroomID => status
router.delete('/deleteClassroom',decodeToken,classroomSetting.deleteClassroom);
//token, classroomID => status
router.post('/cloneClassroom',decodeToken,newClassroom.cloneClassrooms);
//token, classroomID => status
router.post('/joinClassroom',decodeToken,joinClassroom.joinClasses);
//token, joinCode => status
router.post('/transferOwnership',decodeToken,classroomSetting.transferOwnership);
//token, classroomID => status
router.post('/kickTeacher',decodeToken,classroomSetting.kickTeacher);
//token, classroomID, userID => status
router.post('/kickStudent',decodeToken,classroomSetting.kickStudent);
//token, classroomID, userID => status

module.exports = router;