var Assignments = require('../../models/AssignmentModel');
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

function StudentWorks(studentID) {
    this.studentID = studentID;
    this.status = "unfinished";
    this.code = null;
    this.comment = null;
}



exports.checkConditions = function (req, res) {
    Classrooms.findOne({'classroomID': req.body.classroomID}, function (error, classroom) {
        if(error) throw error;
        if(classroom) {
            if(classroom.teacher.contains(req.decoded) || classroom.owner === req.decoded) {
                next();
            } else {
                res.json({'status': "user no power"});
            };
        } else {
            res.json({'status': "classroom does not exist"});
        };
    });
};

exports.assertStudent = function (req, res) {
    
};

exports.newAssignment = function(req, res) {
    Classrooms.findOne({'classroomID': req.body.classroomID}, function (err, classroom) {
        if(err) throw err;
        if(classroom) {
            var myDate = new Date();
            var dueDate = new Date();
            var scheduleDate = new Date();
            var type = new String();
            var studentWorks = new Array();
            var studentwork;
            if(req.body.dueDate > req.body.scheduleDate && req.body.dueDate > myDate) {
                if(req.body.type === "publish") {
                    dueDate = req.body.dueDate;
                    scheduleDate = null;
                    type = "publish";
                    for(var obj in classroom.student) {
                        studentwork = new StudentWorks(obj);
                        studentWorks.push(studentwork);
                    }
                } else if(req.body.type === "schedule") {
                    type =  "schedule";
                    dueDate = req.body.dueDate;
                    scheduleDate =  req.body.scheduleDate;
                } else {
                    type = "draft";
                    dueDate =  null;
                    scheduleDate =  null;
                };
                var data = {
                    type: type,
                    givencode: req.body.givencode,
                    description: req.body.description,
                    studentWorks: studentWorks,
                    correctionType: req.body.correctionType,
                    testCases: req.body.testCases,
                    classroomID: req.body.classroomID,
                    dueDate: dueDate,
                    scheduleDate: scheduleDate
                };
                var newAssignment = new Assignments(data);
                newAssignment.save(function (err) {
                    if(err) {
                        res.json({'status': "failed to save"});
                    } else {
                        res.json({'status': "success"});
                    };
                });
            } else if(req.body.dueDate < req.body.scheduleDate || req.body.dueDate < myDate){
                res.json({'status': "failed to save"});
            }
        };
    });
};
exports.cloneAssignment = function (req,res) {
    Assignments.findOne({'assignmentID': req.body.assignmentID}, function (err, assignment) {
        if(err) throw err;
        if(assignment) {
            for(var obj in req.body.newClassroomID) {
                var data = {
                    type: "draft",
                    givencode: assignment.givencode,
                    description: assignment.description,
                    studentWorks: null,
                    dueDate: null,
                    scheduleDate: null,
                    correctionType: assignment.correctionType,
                    testCases: assignment.testCases,
                    classroomID: obj
                };
                var newAssignment = new Assignments(data);
                newAssignment.save(function (err) {
                    if(err) {
                        res.json({'status': "failed to save"});
                    } else {
                        res.json({'status': "success"});
                    };
                });
            };
        };
    });
};