var Assignments = require('../../models/AssignmentModel');
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

exports.checkConditions = function (req, res) {
    Classrooms.findOne({'classroomID': req.body.classroomID}, function (error, classroom) {
        if(error) throw error;
        if(classroom) {
            if(classroom.teacher.contains(req.decoded) || classroom.owner === req.decoded) {
                next();
            } else {
                res.json({'status': "user no power"});
            }
        } else {
            res.json({'status': "classroom does not exist"});
        };
    });
};

exports.newAssignment = function(req, res) {
    if(req.body.type === "publish") {
        var data = {
            type: "publish",
            givencode: req.body.givencode,
            description: req.body.description,
            studentWorks: null,
            dueDate: req.body.dueDate,
            schedualDate: null,
            correctionType: req.body.correctionType,
            testCases: req.body.testCases,
            classroomID: req.body.classroomID
        };
    } else if(req.body.type === "schedual") {
        var data = {
            type: "schedual",
            givencode: req.body.givencode,
            description: req.body.description,
            studentWorks: null,
            dueDate: req.body.dueDate,
            schedualDate: req.body.schedualDate,
            correctionType: req.body.correctionType,
            testCases: req.body.testCases,
            classroomID: req.body.classroomID
        };
    } else {
        var data = {
            type: "draft",
            givencode: req.body.givencode,
            description: req.body.description,
            studentWorks: null,
            dueDate: null,
            schedualDate: null,
            correctionType: req.body.correctionType,
            testCases: req.body.testCases,
            classroomID: req.body.classroomID
        };
    }
    var newAssignment = new Assignments(data);
    newAssignment.save(function (err) {
        if(err) {
            res.json({'status': "failed to save"});
        } else {
            res.json({'status': "success"});
        };
    });
};
exports.cloneAssignment = function (req,res) {
    Assignments.findOne({'assignmentID': req.body.assignmentID}, function (err, assignment) {
        if(err) throw err;
        if(assignment) {
            var classroomID = assignment.classroomID;
            for(var obj in req.body.newClassroomID) {
                classroomID.push(obj);
            };
            var data = {
                type: "draft",
                givencode: assignment.givencode,
                description: assignment.description,
                studentWorks: null,
                dueDate: null,
                schedualDate: null,
                correctionType: assignment.correctionType,
                testCases: assignment.testCases,
                classroomID: classroomID
            };
            var newAssignment = new Assignments(data);
            newAssignment.save(function (err) {
                if(err) {
                    res.json({'status': "failed to save"});
                } else {
                    res.json({'status': "success"});
                };
            });
        }
    })
};