/**
 * Created by 马鸣玉 on 2017/6/13.
 */

var Assignments = require('../../models/AssignmentModel');
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

/*
exports.newStudentWorks = function (studentID) {
    var studentWork = {
        'studentID': studentID,
        'status': "unfinished",
        'code': null,
        'comment': null
    };
    return studentWork;
};
    */

exports.StudentWorks = {
    createStudentWorks: function (studentID) {
        var studentWorks = {};
        studentWorks.studentID = studentID;

    }
}